import React from 'react'
import CashMoney from './CashMoney'

export default React.createClass({
  render() {
    return (
      <div>
        <br/>
        <div className="col-md-9">
          <h1> Subscribe </h1>
        </div>
        <div className="container">
          <div className="col-md-4 col-md-offset-2">
            <h3> Verification </h3>
            <p><i className="fa fa-5x text-primary sr-icons">✅</i></p>
            <p> In order to pick up passengers with Travelle, drivers must subscribe to our verification plan. </p>
            <p> Verification costs $5.00 a year. During this time, you may pick up as many passengers as you like, and charge them as much as you want. </p>
          </div>
          <div className="col-md-5 col-md-offset-1 text-center">
            <p> Click the button below to subscribe for one year: </p>
            <CashMoney />
          </div>
        </div>
      </div>
    )
  }
})
