import assert from 'assert'
import express from 'express'
import path from 'path'
import compression from 'compression'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './modules/routes'
// import favicon from 'serve-favicon'
const MongoClient = require('mongodb').MongoClient
var passport = require('passport')
var Strategy = require('passport-local').Strategy;
const session = require('express-session');
import ensure from 'connect-ensure-login'
const MongoStore = require('connect-mongo')(session);



passport.use(new Strategy(
  function(username, password, cb) {
    User.findOne({email: username}, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
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
app.use(express.static(path.join(__dirname, 'public'), {index: false}))
app.use(session({
  secret: 's e c u r i t y',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: 'mongodb://localhost:27017/rides'
  })
}));
app.use(require('body-parser').urlencoded({ extended: true }));
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
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });
app.get('/profile',
  ensure.ensureLoggedIn());
app.get('/data/:ride', (req,res) => {
  DB.collection('rides').find({"ride":req.params.ride}).toArray((err, rows) =>{
    assert.equal(err,null);
    res.json(rows)
  })
})
app.get('/data/limit/:limit/start/:start', (req,res) => {
  var limit = Number(req.params.limit)
  var start = Number(req.params.start)
  DB.collection('rides').find()
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
      DB.collection('rides').find().toArray((err, rows)=>{
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
