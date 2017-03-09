import React from 'react'
import CashMoney from './CashMoney'

export default React.createClass({
  render() {
    return (
      <div>
        <br/>
        <div className="container">
          <div className="col-md-5 col-md-offset-4 text-center">
            <h1> Driver Verification </h1>
            <p><i className="fa fa-5x text-primary sr-icons">✅</i></p>
            <p> In order to pick up passengers with Travelle, drivers must subscribe to our verification plan. </p>
            <p> Verification costs $5.00 a month. During this time, you may pick up as many passengers as you like, and charge them as much as you want. </p>
            <p><CashMoney />  <a href='/profile'>Not right now</a></p>
          </div>
        </div>
      </div>
    )
  }
})
