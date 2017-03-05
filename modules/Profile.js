import React from 'react'
import axios from 'axios'
import utils from './utils.js'

export default React.createClass({
  getInitialState() {
    return {
      user: utils.user.default
    }
  },
  componentDidMount(){
    axios.get('/auth/user').then((res) => {
      this.setState({
        user: utils.user.parse(res.data)
      })
    })
  },
  render(){
    return (
        <div className="container">
          <h1> {this.state.user.username+"'s"} Profile </h1>
          <p>Email: {this.state.user.email}</p>
        </div>
    )
  }
})
