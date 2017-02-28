import assert from 'assert'
import express from 'express'
import path from 'path'
import compression from 'compression'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './modules/routes'
import favicon from 'serve-favicon'
const MongoClient = require('mongodb').MongoClient

var DB;
const app = express()
app.use(compression())

app.use(express.static(path.join(__dirname, 'public'), {index: false}))
// app.use(favicon(__dirname + 'public/favicon.ico'))

// send all requests to index.html so browserHistory works
app.get('/data/rides/:ride', (req,res) => {
  DB.collection('rides').find({"ride":req.params.ride}).toArray((err, rows) => {
    res.json(rows)
  })
})
app.get('/data/limit/:limit/start/:start', (req,res) => {
  var limit = Number(req.params.limit)
  var start = Number(req.params.start)
  DB.collection('rides').find()
    .sort({number:1})
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
      DB.collection('rides').find().toArray(function(err, rows){
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
  console.log("connected to mdb");

  app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT)
  })
})
