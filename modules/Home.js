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
      <div className="rideTable">
        <Table headers={this.state.headers} rows={this.state.rows} theme={""}/>
      </div>
    )
  }
})
