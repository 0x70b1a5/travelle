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
    var rides = [];
    if (this.state.user.rides && this.state.user.rides.length > 0) {
      for (let ride of this.state.user.rides) {
        let rideEl = <li key={ride}><a href={"/rides/"+ride}>Ride #{ride}</a></li>
        rides.push(rideEl);
      }
    }
    console.log(rides);
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
            <h2>Current rides:</h2>
            {rides}
          </div>
        </section>
      </div>
    )
  }
})
