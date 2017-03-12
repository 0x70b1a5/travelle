import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <br/>
        <div className="col-md-9">
          <h1> Register to Ride </h1>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-md-offset-2">
                <h3 className="form-register-heading">Your Info:</h3>
                <form className="form-register" action="/register" method="post" encType="multipart/form-data">
                  <p><input name="name" type="text" className="form-control" placeholder="Your Name" required autofocus /></p>
                  <p><input name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoComplete="off"/></p>
                  <p><input name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required autoComplete="off"/></p>
                  <p><input name="confirmPassword" type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password" required autoComplete="off"/></p>
                  <p>Your best picture (less than 2 MB): <input type="file" className="form-control" name="picture" required/></p>
                  <p><input className="btn btn-md btn-primary" value="Register" type="submit"/></p>
                  <input name='status' type="hidden" value='0'/>
                  <p>Already have an account? <a href="/login">Sign in</a>.</p>
                </form>
              </div>
              <div className="col-md-4 col-md-offset-1 text-center">
                <p><i className="fa fa-5x sr-icons">🚗</i></p>
                <h2>Want to be a driver?</h2>
                <hr/>
                <p>If you're going places, why not bring along as many passengers as you can carry? Driving is a fun and easy way to make yourself a little extra spending money for those rainy days.</p>
                <p><a className="btn btn-lg btn-primary" href="/drive">Register to drive</a></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
})
