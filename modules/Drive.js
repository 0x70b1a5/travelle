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
              <div className="col-md-4 col-md-offset-2">
                <p className="text-center"><i className="fa fa-5x sr-icons">🚗</i></p>

                Thanks for choosing to drive with Travelle.

                Please note all drivers are expected to abide by our <a href="/code">Code of Conduct</a>.
              </div>
              <div className="col-md-4">
                <form className="driver-register" action="/register" method="post">
                  <div className="form-group">
                    <input name="name" type="text" className="form-control" placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <input name="email" type="email" className="form-control" id="driver-email" placeholder="Email"/>
                  </div>
                  <div className="form-group">
                    <input name="password" type="password" className="form-control" placeholder="Password"/>
                  </div>
                  <div className="form-group">
                    <input name="confirmPassword" type="password" className="form-control" placeholder="Confirm Password"/>
                  </div>
                  <div className="form-group">
                    <input name="car" type="text" className="form-control" placeholder="Make, model, color and year of your vehicle"/>
                  </div>
                  <div className="form-group">
                    <input name="plate" type="text" className="form-control" placeholder="Vehicle license plate number"/>
                  </div>
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
