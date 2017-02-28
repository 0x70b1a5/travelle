import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render(){
    return (
      <div>
        <div id="hed">Travelle</div>
        <div className="nav">
          <div className="navBtn"><NavLink to="/" onlyActiveOnIndex>Home</NavLink></div>
          <div className="navBtn"><NavLink to="/about">About</NavLink></div>
        </div>
        {this.props.children}
        <div className="nav">
          <div className="navBtn"><NavLink to="/contact">Contact</NavLink>
          <div className="navBtn"><NavLink to="/support">Support</NavLink>
        </div>
      </div>
    )
  }
})
