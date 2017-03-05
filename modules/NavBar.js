import React from 'react'
import NavLink from './NavLink'
import axios from 'axios'

export default React.createClass({
  getInitialState() {
    return {
      loggedIn: false,
      username: "Nobody"
    }
  },
  componentDidMount() {
    axios.get('/auth/user').then((res) => {
      console.log(res);
      if (res.data !== "") {
        this.setState({
          loggedIn: true,
          username: res.data.username
        })
      }
    })
  },
  render(){
    var sessionLinks = this.state.loggedIn ?
      [{ route: "/profile", text: this.state.username }, { route: "/logout", text: "Log out" }]
      : [{ route: "/login", text: "Sign in" }, { route: "/register", text: "Sign up" }]
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
                  <NavLink to="/rides">Ride</NavLink>
                </li>
                <li>
                  <NavLink to="/drive">Drive</NavLink>
                </li>
                <li>
                  <NavLink to={sessionLinks[0].route}>{sessionLinks[0].text}</NavLink>
                </li>
                <li>
                  <a href={sessionLinks[1].route}>{sessionLinks[1].text}</a>
                </li>
              </ul>
          </div>
        </div>
      </nav>
      </div>
    )
  }
})
