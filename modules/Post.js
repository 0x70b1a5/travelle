import React from 'react'

export default React.createClass({
  render() {
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
              <p><select name="from">
                <option value="" disabled selected>From city:</option>
                <option>Montreal</option>
                <option>New York City</option>
                <option>Quebec City</option>
                <option>Toronto</option>
                <option>Boston</option>
                <option>Calgary</option>
                <option>Vancouver</option>
              </select></p>
              <p><select name="to">
                <option value="" disabled selected>To city:</option>
                <option>Montreal</option>
                <option>New York City</option>
                <option>Quebec City</option>
                <option>Toronto</option>
                <option>Boston</option>
                <option>Calgary</option>
                <option>Vancouver</option>
              </select></p>
              <p><input type="datetime-local" name="departure"/> Departure date and time</p>
              <p><input name="seats" type="number" min="1" max="12"/> seats available</p>
              <p><textarea name="address" placeholder="Address and directions to pickup location"/></p>
              <p><input type="submit" className="btn btn-primary" value="Post Ride"/></p>
            </form>
          </div>
        </div>
      </div>
    )
  }
})
