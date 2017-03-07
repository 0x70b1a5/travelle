import React from 'react'
import SkyLight from 'react-skylight'
import axios from 'axios'
import styles from './styles.js'
import onClickOutside from 'react-onclickoutside'
import utils from './utils.js'

var getShortDate = utils.getShortDate

class DetailView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ride: props.ride,
      title: "Join Ride",
      data: ""
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      ride: nextProps.ride,
      data: nextProps.data
    })
  }

  queryAndShow() {
    axios.get('/data/'+this.state.ride).then(function(res){
      var data = res.data[0] || this.state.data;
      console.log(res); console.log(data);
      var contents = <div style={{padding: "1em", wordWrap: "break-word"}}>
        <p>date: {data.departure}</p>
        <p>from: {data.from}</p>
        <p>to: {data.to}</p>
        <p>passengers: {data.passengers}</p>
        <p>driver: {data.driver}</p>
        <p>address: {data.address}</p>
        <p>
          <button className="btn btn-sm btn-primary">Join this ride</button>
        </p>
      </div>
      this.setState({
        data: contents
      })
    }.bind(this))
    this.refs.simpleDialog.show()
  }

  handleClickOutside(e) {
    this.refs.simpleDialog.hide()
  }

  render(){
    return (
      <div>
        <button className="btn btn-sm btn-default" onClick={() => this.queryAndShow()}>Join ride</button>
        <SkyLight
          closeButtonStyle={styles.close}
          ref="simpleDialog"
          showOverlay={false}
          title={this.state.title}>
          {this.state.data}
        </SkyLight>
      </div>
    )
  }
}

export default onClickOutside(DetailView)
