import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import About from './About.js'
import Rides from './Rides'
import Drive from './Drive'
import Home from './Home'
import Code from './Code'
import Support from './Support'
import Jobs from './Jobs'
import Contact from './Contact'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/rides" component={Rides}/>
    <Route path="/drive" component={Drive}/>
    <Route path="/about" component={About}/>
    <Route path="/code" component={Code}/>
    <Route path="/jobs" component={Jobs}/>
    <Route path="/support" component={Support}/>
    <Route path="/contact" component={Contact}/>
  </Route>
)
