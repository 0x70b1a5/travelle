import React from 'react'
import axios from 'axios'

export default React.createClass({
  getInitialState() {
    return {
      lastCharge: new Date(0)
    }
  },
  componentDidMount() {
    axios.get('/auth/user').then((res) => {
      if (res.data !== "") {
        this.setState({
          lastCharge: res.data.lastCharge
        })
      }
    })
  },
  render() {
    var submit = this.lastCharge <= Date.now()-2592000000 ? // 1 month
      <p>Before you post a ride, please <a href="/driver-subscribe">verify your profile</a> with Travelle.</p>
      : <p><input type="submit" className="btn btn-primary" value="Post Ride"/></p>

    return (
      <div className="container">
        <h1> Post a Ride </h1>
        <div className="row">
          <div className="col-md-4 col-md-offset-2">
            <h3> Ride posting guide: </h3>
            <ul>
              <li> Unambiguously state the location and time of pickup. </li>
              <li> While driving, follow the <a href="/code">Code of Conduct</a>.</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h3>Ride details</h3>
            <form className="ride-post" action="/post/ride" method="post">
              <p><select name="from" className="form-control" value="From city:">
                <option value="" disabled>From city:</option>
                <option>Montreal</option>
                <option>New York City</option>
                <option>Quebec City</option>
                <option>Toronto</option>
                <option>Boston</option>
                <option>Calgary</option>
                <option>Vancouver</option>
              </select><select name="to" className="form-control" value="To city:">
                <option value="" disabled>To city:</option>
                <option>Montreal</option>
                <option>New York City</option>
                <option>Quebec City</option>
                <option>Toronto</option>
                <option>Boston</option>
                <option>Calgary</option>
                <option>Vancouver</option>
              </select></p>
              <p><input className="form-control" type="datetime-local" name="departure"/></p>
              <p><input className="form-control" name="seats" type="number" min="1" max="12" placeholder="Seats available"/></p>
              <p><textarea className="form-control" name="address" placeholder="Address and directions to pickup location"/></p>

              {submit}

            </form>
          </div>
        </div>
      </div>
    )
  }
})
