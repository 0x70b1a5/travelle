import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'

class CashMoney extends Component {
  onToken (token) {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(data => {
        return (data);
      });
    });
  }
  render() {
    return (
      <StripeCheckout
        stripeKey="pk_test_kjqeoiElQx07966IAuL4FfzQ"
        token={this.onToken}
        amount={500}
      />
    )
  }
}
export default CashMoney;
