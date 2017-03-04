import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render(){
    /*<div className="container-fluid">
      <div className="navbar-header">
        <div className="navbar-brand">Travelle</div>
      </div>
      <div className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/rides">Rides</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </div>
    </div>*/
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
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rides">Ride</NavLink>
                    </li>
                    <li>
                        <NavLink to="/drive">Drive</NavLink>
                    </li>
                  </ul>
              </div>
          </div>
      </nav>
      </div>
    )
  }
})
