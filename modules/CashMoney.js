import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default React.createClass({
  onToken(token) {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(token => {
      console.log(token);
      alert(`We are in business, ${token.email}`);
    });
  },

  // ... ?

  render() {
    return (
      // ... ??
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_kjqeoiElQx07966IAuL4FfzQ"
      />
    )
  }
})
