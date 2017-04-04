import React from 'react'

export default React.createClass({
  render(){
    return (
      <div>
      <section id="landing" className="text-center bg-dark">
        <header>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <div className="header-content">
            <div className="header-content-inner">
                <h1 id="homeHeading">Travelle</h1>
                <hr/>
                <p>Better carpooling for travelers.</p>
                <a href="#about" className="btn btn-primary btn-xl page-scroll">Find Out More</a>
            </div>
        </div>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        </header>
      </section>

      <section id="services">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 text-center">
                      <h2 className="section-heading">Why ride with Travelle?</h2>
                      <hr className="primary"/>
                  </div>
              </div>
          </div>
          <div className="container">
              <div className="row">
                  <div className="col-md-4 text-center">
                      <div className="service-box">
                          <i className="fa fa-5x text-primary sr-icons">🚗</i>
                          <h3>Go anywhere</h3>
                          <p className="text-muted">Our drivers live all across the country, so you're never searching for long.</p>
                      </div>
                  </div>
                  <div className="col-md-4 text-center">
                      <div className="service-box">
                          <i className="fa fa-5x text-primary sr-icons">🏃</i>
                          <h3>Relax on the road</h3>
                          <p className="text-muted">We make sure our riders and drivers follow our <a href="/code">Code of Conduct</a>.</p>
                      </div>
                  </div>
                  <div className="col-md-4 text-center">
                      <div className="service-box">
                          <i className="fa fa-5x text-primary sr-icons">💰</i>
                          <h3>Budget-friendly</h3>
                          <p className="text-muted">We know travellers love to save, and we've built our business to match.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="bg-primary" id="about">
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 text-center">
                      <h2 className="section-heading">Simple and affordable rides from one city to the next.</h2>
                      <hr className="light"/>
                      <p className="text-faded">Book a ride with us in three clicks. Get riding today.</p>
                      <a href="/rides" className="page-scroll btn btn-default btn-xl sr-button">Book a ride</a>
                  </div>
              </div>
          </div>
      </section>

      <aside className="bg-dark">
          <div className="container text-center">
              <div className="call-to-action">
                  <h2>Rather drive?</h2>
                  <hr className="light"/>
                  <p className="text-faded">You're the wheels that make our world spin round. If you've got two or more seats and love feeling the rubber hit the road, we'd love to have you with us.</p>
                  <a href="/drive" className="btn btn-primary btn-xl sr-button">Sign up to drive</a>
              </div>
          </div>
      </aside>

      <section id="contact">
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 col-lg-offset-2 text-center">
                      <h2 className="section-heading">Let's Get In Touch!</h2>
                      <p>Do you have an idea that could help us be even better? We're always happy to talk to users and lovers of travel. Drop us a line:</p>
                  </div>
                  <div className="col-lg-4 col-lg-offset-2 text-center">
                      <i className="fa fa-phone fa-3x sr-contact"></i>
                      <p>123-456-6789</p>
                  </div>
                  <div className="col-lg-4 text-center">
                      <i className="fa fa-envelope-o fa-3x sr-contact"></i>
                      <p><a href="mailto:ops@getpaidtodrive.net">ops@getpaidtodrive.net</a></p>
                  </div>
              </div>
          </div>
      </section>
    </div>
    )
  }
})
