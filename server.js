import assert from 'assert'
import express from 'express'
import path from 'path'
import compression from 'compression'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './modules/routes'
import utils from './modules/utils'
import bodyParser from 'body-parser'
// import favicon from 'serve-favicon'
const MongoClient = require('mongodb').MongoClient
var passport = require('passport')
var Strategy = require('passport-local').Strategy;
const session = require('express-session');
import ensure from 'connect-ensure-login'
const MongoStore = require('connect-mongo')(session);
import bcrypt from 'bcrypt'
import md5 from 'md5'
import nodemailer from 'nodemailer'
var stripe = require("stripe")("sk_test_8PMWCmZQOMFXaPcXWwuA1Upu");
import multer from 'multer'
var upload = multer({ dest: './public/img/uploads/' })


passport.use(new Strategy({
    usernameField: 'email'
  },
  function(email, password, cb) {
    User.findOne({email: email}, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (!bcrypt.compareSync(password, user.password)) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }));
passport.serializeUser(function(user, cb) {
  cb(null, user.email);
});
passport.deserializeUser(function(email, cb) {
  User.findOne({email: email}, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


var DB, User, Ride;
const app = express()
app.use(compression())
app.use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public'), {index: false}))
app.use(session({
  secret: 's e c u r i t y',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: 'mongodb://localhost:27017/rides'
  })
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(favicon(__dirname + 'public/favicon.ico'))
passport.serializeUser(function(user, done) {
  done(null, user.email);
});
passport.deserializeUser(function(email, done) {
  User.findOne({email: email}, function(err, user) {
    done(err, user);
  });
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { //TODO dedicated email addr
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS
  }
});


app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile'); // welcome screen?
  });
app.post('/register', upload.single('picture'), (req, res, next) => {
  if (!utils.user.valid(User, req.body)) {
    console.error(`BadUserInfoException: User is invalid:`, req.body);
    res.redirect('/register')
    return;
  }
  if (!utils.file.valid(req.file)) {
    console.error(`BadFileException: File is invalid:`, req.file);
    res.redirect('/register')
    return;
  }
  var hash = bcrypt.hashSync(req.body.password, 10),
  newUser = {
    name: req.body.name,
    email: req.body.email,
    password: hash,
    status: req.body.status,
    picture: req.file.path
  };
  if (newUser.status == '0') { // 0 => rider, 1 => driver
    // we're good
  } else if (newUser.status == '1') {
    newUser.car = req.body.car;
    newUser.plate = req.body.plate;
    newUser.lastCharge = new Date(0); // i.e. never
  } else {
    console.error(`BadUserInfoException: User status is invalid:`, newUser);
    res.redirect('/register');
    return;
  }
  // create user in DB
  User.insertOne(newUser, (err, rows) => {
    assert.equal(err, null)
  });
  // send registration email
  utils.mail.send(transporter, utils.mail.newUser(req.body.email));

  res.redirect('/login')
})
app.get('/driver-subscribe', ensure.ensureLoggedIn()); // TODO ensure users who access this page are drivers!
app.post('/save-stripe-token', (req, res) => {
  console.log("token: ", req.body);
  var email = req.body.email,
  userEmail = req.body.userEmail;
  // create a Customer
  stripe.customers.create({
    email: email,
    source: req.body.id,
  }).then(customer => {
    console.log("customer: ", customer);
    // charge them
    return stripe.charges.create({
      amount: 500,
      currency: "cad",
      description: "Driver verification",
      customer: customer.id
    });
  }).then(charge => {
    console.log("charge:", charge);
    // save customer ID to user's Travelle account.
    // we can't use the charge email in case they paid
    //   with a different email.
    User.findOneAndUpdate({email:userEmail}, {$set: {
      customerId: charge.customer,
      lastCharge: Number(new Date())
    }}, // {returnNewDocument: true},
    (err_, res_) => {
      assert.equal(err_, null);
      // finally, send email:
      utils.mail.send(transporter, utils.mail.subscription(userEmail));
    });
  });
  res.sendStatus(200);
});
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });
app.get('/profile', ensure.ensureLoggedIn());
app.get('/data/:id', (req,res) => {
  Ride.find({id:req.params.id}).toArray((err, rows) =>{
    assert.equal(err,null);
    res.json(rows);
  })
});
app.get('/data/user/:email', (req, res) => {
  User.findOne({email: req.params.email}, (err, doc) => {
    assert.equal(err, null);
    res.json(utils.user.parse(doc));
  })
})
app.get('/auth/user', (req, res) => { // returns current user or null
  res.json(req.user);
});
app.get('/post', ensure.ensureLoggedIn());
app.post('/post/ride', ensure.ensureLoggedIn(), (req,res) => {
  var ride = req.body;
  if (!utils.user.isDriver(req.user)) {
    console.error(`BadUserInfoException: User is not a driver:`, req.user);
    res.redirect('/post');
    return;
  } else if (!utils.user.subscribed(req.user)) {
    console.error(`UserNotSubscribedException: User is not subscribed:`, req.user);
    res.redirect('/post');
    return;
  } else if (!utils.ride.valid(ride)) {
    console.error(`BadRideInfoException: Ride info is invalid:`, req.body);
    res.redirect('/post');
    return; // is this necessary? // Yes.
  }
  ride.driver = req.user.email;
  ride.passengers = 0;
  ride.seats = Number(ride.seats);
  ride.list = [];
  Ride.find().toArray((err, all) => {
    assert.equal(err, null);
    ride.id = md5(all.length).slice(0,6);
    Ride.insertOne(ride, (err, rows) => {
      assert.equal(err, null);
    });
  });
  utils.mail.send(transporter, utils.mail.newRide(req.user.email));
  res.redirect('/rides');
})
app.post('/join/ride/:id', ensure.ensureLoggedIn(), (req, res) => {
  Ride.findOne({id: req.params.id}, (err, ride) => {
    assert.equal(err,null);
    if (ride.list.indexOf(req.user.email) !== -1) {
      console.error(`UserUnauthorizedException: User is already on ride:`, req.user, ride);
      res.sendStatus(403);
      return;
    } else if (req.user.email == ride.driver) {
      console.error(`UserUnauthorizedException: Driver cannot join ride:`, req.user, ride);
      res.sendStatus(403);
      return;
    } else if (ride.seats == ride.passengers) {
      console.error(`VehicleOverCapacityException: Car is full:`, ride);
      res.sendStatus(403);
      return;
    }
    var newList = ride.list;
    newList.push(req.user.email);
    Ride.findOneAndUpdate({id: ride.id},
    {$set: {list: newList, passengers: ++ride.passengers}}, (err, doc) => {
      assert.equal(err,null);
      User.findOne({email: req.user.email}, (err, user) => {
        var newRides = user.rides || [];
        newRides.push(ride.id);
        User.findOneAndUpdate({email: req.user.email},
        {$set: {rides: newRides}}, (err, doc) => {
          assert.equal(err, null);
          var rideText = utils.ride.text(doc);
          utils.mail.send(transporter, utils.mail.joinRide(rideText));
          // res.redirect('/rides/'+ride.id) TODO individual ride pages
          res.redirect('/rides')
        })
      })
    })
  });
});
app.get('/rides/:id', ensure.ensureLoggedIn());
app.get('/data/limit/:limit/start/:start', (req,res) => {
  var limit = Number(req.params.limit)
  var start = Number(req.params.start)
  Ride.find().toArray((err, rows) => {
    res.json(rows.slice(start,limit+start))
  })
})
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      res.sendFile(path.resolve(__dirname + 'public/index.html'));
    } else if (req.url == '/data'){
      Ride.find().toArray((err, rows)=>{
        assert.equal(err,null)
        res.json(rows)
      })
    } else {
      // it's a 404
      res.status(404).send("Not Found");
    }
  })
})

var PORT = process.env.PORT || 8080

MongoClient.connect("mongodb://localhost:27017/rides", (err,db) => {
  assert.equal(null,err)
  DB = db;
  User = DB.collection('users');
  Ride = DB.collection('rides');
  console.log("connected to mdb");

  app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT)
  })
})
