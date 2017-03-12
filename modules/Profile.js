import React from 'react'
import axios from 'axios'
import utils from './utils.js'
import UserInfo from './UserInfo'

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
    // TODO add list of current rides
    return (
      <div>
        <br/>
        <div className="col-md-9">
          <h1> Your Profile </h1>
        </div>
        <section>
          <div className="container">
            <UserInfo user={this.state.user} />
            <p>Your account email: {this.state.user.email}</p>
          </div>
        </section>
      </div>
    )
  }
})
