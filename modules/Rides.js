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
      'Driver',
      'Join'
      ],
      rows: [{
        'from': "",
        'to': "",
        'departure': "",
        'passengers': "",
        'driver': "",
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
      <div className="container">
        <h1>Ride</h1>
        <div className="row">
          <div className="rideTable col-md-10 col-md-offset-1">
            <Table headers={this.state.headers} rows={this.state.rows} theme={""}/>
          </div>
        </div>
      </div>
    )
  }
})
