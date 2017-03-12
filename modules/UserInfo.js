import React from 'react'
import axios from 'axios'
import utils from './utils'
import Avatar from './Avatar'

export default React.createClass({
  render() {
    var status = Number(this.props.user.status) ? "Driver" : "Rider";
    return (
      <div className="user-info">
        <Avatar img={this.props.user.picture} />
        <h5>{this.props.user.name} <span className="label label-default">{status}</span></h5>
      </div>
    )
  }
})
