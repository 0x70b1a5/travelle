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
import axios from 'axios'
import bcrypt from 'bcrypt'
import md5 from 'md5'
import nodemailer from 'nodemailer'
var stripe = require("stripe")("sk_test_8PMWCmZQOMFXaPcXWwuA1Upu");


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
app.use(express.static(path.join(__dirname, 'public'), {index: false}))
app.use(session({
  secret: 's e c u r i t y',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: 'mongodb://localhost:27017/rides'
  })
}));
app.use(bodyParser.urlencoded({ extended: true }));
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


var transporter = nodemailer.createTransport({
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
app.post('/register', (req, res) => {
  if (utils.user.valid(req.body) && utils.file.valid(req.files.picture)) {
    var hash = bcrypt.hashSync(req.body.password, 10),
    newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      status: req.body.status
    };
    console.log(newUser);
    if (newUser.status == '0') { // 0 => rider, 1 => driver
      // we're good
    } else if (newUser.status == '1') {
      newUser.car = req.body.car;
      newUser.plate = req.body.plate;
      newUser.lastCharge = new Date(0); // i.e. never
      newUser.picture = req.files.picture;
    } else {
      console.error(`BadUserInfoException: User status is invalid: ${newUser}`);
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
  } else {
    res.redirect('/register')
  }
})
app.get('/driver-subscribe', ensure.ensureLoggedIn()); // TODO ensure users who access this page are drivers!
app.post('/save-stripe-token', (req, res) => {
  console.log("token: ", req.body);
  var email = req.body.email,
  userEmail = req.body.userEmail;
  // Create a Customer
  stripe.customers.create({
    email: email,
    source: req.body.id,
  }).then(customer => {
    console.log("customer: ", customer);
    // Charge them
    return stripe.charges.create({
      amount: 500,
      currency: "cad",
      description: "Driver verification",
      customer: customer.id
    });
  }).then(charge => {
    console.log("charge:", charge);
    // Use and save the charge info and save customer ID to
    //   user's Travelle account.
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
})
app.get('/auth/user', (req, res) => { // returns current user or null
  res.json(req.user);
});
app.get('/post', ensure.ensureLoggedIn());
app.post('/post/ride', ensure.ensureLoggedIn(), (req,res) => {
  var ride = req.body;
  if (!utils.user.isDriver(req.user) ||
    !utils.user.subscribed(req.user) ||
    !utils.ride.valid(ride)
  ) {
    res.redirect('/post');
    return; // is this necessary?
  }
  ride.driver = req.user.name;
  ride.passengers = 0;
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
app.post('/join/ride', ensure.ensureLoggedIn(), (req, res) => {
  Ride.findOne({
    // TODO
  });
})
app.get('/data/limit/:limit/start/:start', (req,res) => {
  var limit = Number(req.params.limit)
  var start = Number(req.params.start)
  Ride.find()
    .toArray((err, rows) => {
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
  User = db.collection('users');
  Ride = db.collection('rides');
  console.log("connected to mdb");

  app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT)
  })
})
