import React from 'react'

export default React.createClass({
  render(){
    return (
      <div>
        <br/>
        <div className="col-md-9">
          <h1> Post a Ride </h1>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-2">

              </div>
              <div className="col-md-4">
                <p className="text-center"><i className="fa fa-5x text-primary sr-icons">🚗</i></p>

                Thanks for choosing to drive with Travelle.

                Please note all drivers are expected to abide by our <a href="/code">Code of Conduct</a> while traveling with riders.
              </div>
              <div className="col-md-4">
                <form>
                  <div className="form-group">
                    <label htmlFor="driver-email">Email address</label>
                    <input type="email" className="form-control" id="driver-email" placeholder="Email"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" className="form-control" id="" placeholder="Password"/>
                  </div>
                  City:
                  <select className="form-control">
                    <option>Montreal</option>
                    <option>Toronto</option>
                    <option>Quebec City</option>
                    <option>New York City</option>
                    <option>Calgary</option>
                  </select>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox"/> Check me out
                    </label>
                  </div>
                  <button type="submit" className="btn btn-default">Submit</button>
                </form>
              </div>
              <div className="col-md-2">
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
})
