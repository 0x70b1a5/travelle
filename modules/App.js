import React from 'react'
import NavLink from './NavLink'
import NavBar from './NavBar'

export default React.createClass({
  render(){
    return (
      <div>
        <NavBar />
        {this.props.children}
        <div className="container">
          <div className="navBtn"><NavLink to="/contact">Contact</NavLink></div>
          <div className="navBtn"><NavLink to="/support">Support</NavLink></div>
        </div>
      </div>
    )
  }
})
