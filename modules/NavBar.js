import React from 'react'
import NavLink from './NavLink'
import axios from 'axios'

export default React.createClass({
  getInitialState() {
    return {
      loggedIn: false,
      email: "Nobody",
      status: "0",
    }
  },
  componentDidMount() {
    axios.get('/auth/user').then((res) => {
      if (res.data !== "") {
        this.setState({
          loggedIn: true,
          email: res.data.email,
          status: res.data.status
        })
      }
    })
  },
  render(){
    var sessionLinks = [
      { route: "/drive", text: "Drive" },
      { route: "/login", text: "Sign in" },
      { route: "/register", text: "Register" }
    ]
    if (this.state.loggedIn) {
      if (this.state.status == "1") {
        sessionLinks = [
          { route: "/post", text: "Post a Ride" },
          { route: "/profile", text: this.state.email },
          { route: "/logout", text: "Log out" }
        ]
      } else {
        sessionLinks = [
          { route: "/rides", text: "Browse Rides" },
          { route: "/profile", text: this.state.email },
          { route: "/logout", text: "Log out" }
        ]
      }
    }
    return (
      <div>
      <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid bg-primary">
          <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
              </button>
              <a className="navbar-brand page-scroll" href="/">Travelle</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to={sessionLinks[0].route}>{sessionLinks[0].text}</NavLink>
                </li>
                <li>
                  <NavLink to={sessionLinks[1].route}>{sessionLinks[1].text}</NavLink>
                </li>
                <li>
                  <a href={sessionLinks[2].route}>{sessionLinks[2].text}</a>
                </li>
              </ul>
          </div>
        </div>
      </nav>
      </div>
    )
  }
})
