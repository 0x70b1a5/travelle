import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <br/>
        <div className="col-md-9">
          <h1> About Travelle </h1>
        </div>
        <section>
          <div className="container">
            <h2>What do we do?</h2>
            <p>We are a long-distance ridesharing app.</p>
            <h2>How does it work?</h2>
            <p>If you want to catch a ride, head over to our <a href="/rides">Rides</a> page. If you want to sign up to drive, please make a driver account on the <a href="/drive">Drive</a> page.</p>
            <h2>How much does it cost?</h2>
            <p>Drivers set the price of their trips. We don't handle that money, it passes between the riders and the driver. To drive passengers with Travelle, drivers must verify themselves with our service, which costs five dollars a month.</p>
            <h2>Other questions</h2>
            <p>Please email us: ops@getpaidtodrive.net</p>
          </div>
        </section>
      </div>
    )
  }
})
