import React from 'react'
import NavLink from './NavLink'
import NavBar from './NavBar'
import Footer from './Footer'

export default React.createClass({
  render(){
    return (
      <div>
        <NavBar />
        <p>&nbsp;</p>
        {this.props.children}
        <Footer />
      </div>
    )
  }
})
