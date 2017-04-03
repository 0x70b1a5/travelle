import React from 'react'
import axios from 'axios'
import utils from './utils.js'
import UserInfo from './UserInfo'

export default React.createClass({
  getInitialState() {
    return {
      user: utils.user.default,
      ride: "000000"
    }
  },
  componentDidMount(){
    axios.get('/data/'+this.params.ride).then((res) => {
      axios.get('/data/user/'+res.data.email).then((res_) => {
        this.setState({
          ride: utils.ride.parse(res.data),
          driver: utils.user.parse(res_.data)
        })
      })
    })
  },
  render(){
    return (
      <div>
        <br/>
        <div className="col-md-9">
          <h1> Ride #{this.state.ride} </h1>
        </div>
        <section>
          <div className="container">
            <div style={{padding: "1em", wordWrap: "break-word"}}>
              <h4> Ride details </h4>
              <h5>{this.state.ride.seats - this.state.ride.passengers} seats remaining</h5>
              <p>This ride leaves from {this.state.ride.from} on {Date(this.state.ride.departure)}, destination {this.state.ride.to}. </p>
              <UserInfo size={"small"} user={this.state.driver}/>
              <p>Pickup address details: {this.state.ride.address}</p>
              <form action={"/join/ride/"+this.state.ride.id} method="post">
                <button className="btn btn-sm btn-primary">Join this ride</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    )
  }
})
