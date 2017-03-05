import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import About from './About.js'
import Rides from './Rides'
import Drive from './Drive'
import Home from './Home'
import Code from './Code'
import Support from './Support'
import SignIn from './SignIn'
import Profile from './Profile'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/rides" component={Rides}/>
    <Route path="/drive" component={Drive}/>
    <Route path="/login" component={SignIn}/>
    <Route path="/about" component={About}/>
    <Route path="/code" component={Code}/>
    <Route path="/support" component={Support}/>
    <Route path="/profile" component={Profile}/>
  </Route>
)
