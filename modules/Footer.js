import React from 'react'

export default React.createClass({
  render() {
    // <div className="col-sm-4">
    //   <h4>More Information</h4>
    //   <li><a href="/team">Our Team</a></li>
    //   <li><a href="/jobs">Apply to Work at Travelle</a></li>
    //   <li><a href="/tos">Legal</a></li>
    // </div>
    return (
      <section className="bg-dark footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <h4>Get in Touch</h4>
              <li><a href="mailto:ops@getpaidtodrive.net">Contact Us</a></li>
              <li><a href="/support">Support</a></li>
              <li><a href="mailto:ops@getpaidtodrive.net">Feedback</a></li>
            </div>
            <div className="col-sm-4">
              <h4>Social</h4>
              <li><a href="//twitter.com">Twitter</a></li>
              <li><a href="//twitter.com">Facebook</a></li>
              <li><a href="//twitter.com">Instagram</a></li>
            </div>
          </div>
        </div>
      </section>
    )
  }
});
