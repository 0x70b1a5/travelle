import React from 'react'
import SkyLight from 'react-skylight'
import axios from 'axios'
import styles from './styles.js'
import onClickOutside from 'react-onclickoutside'
import UserInfo from './UserInfo'

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
    var that = this;
    axios.get('/data/'+this.state.ride).then(function(res) {
      var data = res.data[0] || this.state.data;
      axios.get('/data/user/'+data.driver).then(function(user) {
        console.log(user);
        var contents = (
          <div style={{padding: "1em", wordWrap: "break-word"}}>
            <h4> Ride details </h4>
            <h5>{data.seats - data.passengers} seats remaining</h5>
            <p>This ride leaves from {data.from} on {Date(data.departure)}, destination {data.to}. </p>
            <UserInfo size={"small"} user={user.data}/>
            <p>Pickup address details: {data.address}</p>
            <form action={"/join/ride/"+data.id} method="post">
              <button className="btn btn-sm btn-primary">Join this ride</button>
            </form>
          </div>
        );
        that.setState({
          data: contents
        })
      })
    })
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
          dialogStyles={styles.details}
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
