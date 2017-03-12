import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

export default React.createClass({
  getInitialState() {
    return {
      email: "user@example.com",
      lastCharge: new Date(0)
    }
  },
  updateUserInfo(){
    axios.get('/auth/user').then((res) => {
      if (res.data !== "") {
        var lastCharge = res.data.lastCharge || new Date(0);
        console.log(lastCharge);
        this.setState({
          email: res.data.email,
          lastCharge: lastCharge
        })
      }
    })
  },
  componentDidMount() {
    this.updateUserInfo()
  },
  onToken (token) {
    token.userEmail = this.state.email; // in case stripe email != login email
    var that = this;
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      // retrieve user's new lastCharge
      setTimeout(that.updateUserInfo, 3000);
    });
  },
  render() {
    var pay = this.state.lastCharge <= Date.now()-2592000000 ?
      <p>
        <StripeCheckout
          stripeKey="pk_test_kjqeoiElQx07966IAuL4FfzQ"
          token={this.onToken}
          amount={500}
        /> <a href='/profile' className="btn btn-default">Not right now</a>
      </p>
      : <div>
          <p>You have been verified. Thank you!</p>
          <p><a href="/post" className="btn btn-primary">Post a Ride</a></p>
        </div>
    return pay
  }
})
