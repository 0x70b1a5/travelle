import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import About from './About.js'
import Rides from './Rides'
import Home from './Home'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/rides" component={Rides} />
    <Route path="/about" component={About}/>
  </Route>
)
