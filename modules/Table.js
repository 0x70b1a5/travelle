import React from 'react'
import Row from './Row.js'
import HeaderRow from './HeaderRow.js'
import axios from 'axios'

export default React.createClass({
  getInitialState(){
    return {
      headers: this.props.headers || [],
      rows: this.props.rows || [],
      start: 0
    }
  },
  componentWillReceiveProps(nextProps){
    this.setState({
      headers: nextProps.headers,
      rows: nextProps.rows,
      start: (nextProps.start || this.state.start)
    })
  },
  updateRides(start) {
    var newStart = this.state.start+start
    axios.get('/data/limit/50/start/'+newStart).then((res)=>{
      var newRows = res.data
      if (newRows.length > 0) {
        this.setState({
          start: newStart,
          rows: newRows
        })
      }
    })
  },
  render() {
    var backButton = null;
    if (this.state.start >= 50) {
      backButton = <a href="#hed"><button className="btn btn-md btn-primary" onClick={() => this.updateRides(-50)}>previous 50 rides</button></a>
    }
    var frwdButton = <a href="#hed"><button className="btn btn-md btn-primary" onClick={() => this.updateRides(50)}>next 50 rides</button></a>
    var paginators = <p className={"paginators"}>
      {frwdButton}
      {backButton}
    </p>

    return (
      <div id="table">
        {paginators}
        <table className="table">
          <thead>
            <HeaderRow cells={this.props.headers} theme={this.props.theme} />
          </thead>
          <tbody>
            {
              this.state.rows.map((row,i) => {
                return <Row key={i} cells={row} theme={this.props.theme} />
              })
            }
          </tbody>
        </table>
        {paginators}
      </div>
    )
  }
})
