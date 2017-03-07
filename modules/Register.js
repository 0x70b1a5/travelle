import React from 'react'

export default React.createClass({
  render() {
    return (
      <section>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-2">
        <form className="form-register" action="/register" method="post">
          <h1 className="form-register-heading">Register to Ride</h1>
          <p><input name="name" type="text" className="form-control" placeholder="Your Name" /></p>
          <p><input name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus="" autoComplete="off"/></p>
          <p><input name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required="" autoComplete="off"/></p>
          <p><input name="confirmPassword" type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password" required="" autoComplete="off"/></p>
          <p><input className="btn btn-md btn-primary" value="Register" type="submit"/></p>
          <input name='status' type="hidden" value='0'/>
          <p>Already have an account? <a href="/login">Sign in</a>.</p>
        </form>
          </div>
          <div className="col-md-4 col-md-offset-1 bg-dark text-center">
            <p><i className="fa fa-5x text-default sr-icons">🚗</i></p>
            <h2>Want to be a driver?</h2>
            <hr/>
            <p><a className="btn btn-lg btn-default" href="/drive">Register to drive</a></p>
          </div>
        </div>
      </div>
    </section>
    )
  }
})
