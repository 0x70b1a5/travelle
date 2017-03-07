import React from 'react'

export default React.createClass({
  render() {
    return (
      <section>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-2">
        <form className="form-signin" action="/login" method="post">
          <h1 className="form-signin-heading">Sign in</h1>
          <p><input name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus="" autoComplete="off"/></p>
          <p><input name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required="" autoComplete="off"/></p>
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          <p><input className="btn btn-md btn-primary" value="Sign In" type="submit"/></p>
          <p>Don't have an account? <a href="/register">Register</a>.</p>
        </form>
          </div>
        </div>
      </div>
    </section>
    )
  }
})
