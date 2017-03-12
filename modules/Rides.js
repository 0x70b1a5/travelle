import axios from 'axios'
import React from 'react'
import Table from './Table'

export default React.createClass({
  getInitialState() {
    return {
      headers: [
      'From',
      'To',
      'Departure',
      'Passengers',
      'Seats',
      'Price',
      'Join'
      ],
      rows: [{
        'from': "",
        'to': "",
        'departure': "",
        'passengers': "",
        'seats': "",
        'price': "",
        'join': ""
      }]
    }
  },
  componentDidMount(){
    axios.get('/data/limit/50/start/0')
      .then((res)=> {
        this.setState({
          rows: res.data
        })
      })
  },
  render(){
    return (
      <div>
        <br/>
        <div className="col-md-9">
          <h1>Join a Ride</h1>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="rideTable col-md-10 col-md-offset-1">
                <Table headers={this.state.headers} rows={this.state.rows} theme={""}/>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
})
