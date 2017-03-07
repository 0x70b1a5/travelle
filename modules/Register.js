import React from 'react'

export default React.createClass({
  render() {
    return (
      <section>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
        <form className="form-register" action="/register" method="post">
          <h2 className="form-register-heading">Sign Up to Ride</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus="" autoComplete="off"/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required="" autoComplete="off"/>
          <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
          <input name="confirmPassword" type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password" required="" autoComplete="off"/>
          <input className="btn btn-lg btn-primary" value="Register" type="submit"/> Don't have an account? <a href="/login">Sign in</a>
          <input name='status' type="hidden" value='0'/>
        </form>
          Want to drive with us? Register <a href="/drive">here</a>.
          </div>
        </div>
      </div>
    </section>
    )
  }
})
