import React from 'react'

export default React.createClass({
  render() {
    return (
      <section>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
        <form className="form-signin" action="/login" method="post">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus="" autoComplete="off"/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required="" autoComplete="off"/>
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          <input className="btn btn-lg btn-primary" value="Sign In" type="submit"/> Don't have an account? <a href="/register">Register</a>
        </form>
          </div>
        </div>
      </div>
    </section>
    )
  }
})
