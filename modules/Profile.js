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
    var status = this.state.user.status ? "Driver" : "Rider";
    return (
      <div>
        <br/>
        <div className="col-md-9">
          <h1> Your Profile </h1>
        </div>
        <section>
          <div className="container">
            <p><img style={{maxHeight: "300px", maxWidth: "300px"}} src={this.state.user.picture.replace(/public\//,'')} /></p>
            <h4>{this.state.user.name}</h4><span className="label label-default">{status}</span>
            <p>{this.state.user.email}</p>
          </div>
        </section>
      </div>
    )
  }
})
