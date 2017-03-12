import React from 'react'

export default React.createClass({
  render(){
    return (
      <div>
        <br/>
        <div className="col-md-9">
          <h1> Register to Drive </h1>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-md-offset-2 text-center">
                <h3>Thanks for driving with Travelle. </h3>
                <p className="text-center"><i className="fa fa-5x sr-icons">🚗</i></p>
                <p>Please note all drivers are expected to follow our <a href="/code">Code of Conduct</a>.</p>
              </div>
              <div className="col-md-4">
                <h3> Your info: </h3>
                <form className="driver-register" action="/register" method="post">
                  <p><input name="name" type="text" required className="form-control" placeholder="Your Name" /></p>
                  <p><input name="email" type="email" required className="form-control" id="driver-email" placeholder="Email"/></p>
                  <p><input name="password" type="password" required className="form-control" placeholder="Password"/></p>
                  <p><input name="confirmPassword" type="password" required className="form-control" placeholder="Confirm Password"/></p>
                  <p><input name="car" type="text" className="form-control" required placeholder="Make, model, color and year of your vehicle"/></p>
                  <p><input name="plate" type="text" className="form-control" required placeholder="Vehicle license plate number"/></p>
                  <p>Your best picture (less than 2 MB): <input type="file" className="form-control" name="picture" required/></p>
                  <input type="hidden" name="status" value="1" />
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
})
