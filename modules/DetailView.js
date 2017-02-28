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
      data: {
        date: 'none',
        from: 'none',
        to: 'none',
        departure: 'none',
        passengers: 'none',
        driver: 'none'
      }
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      ride: nextProps.ride,
      data: nextProps.data
    })
  }

  queryAndShow() {
    axios.get('/data/ride/'+this.state.ride).then(function(res){
      var data = res.data[0] || this.state.data;
      var contents = <div style={{padding: "1em", wordWrap: "break-word"}}>
        <p>date: data.date</p>
        <p>from: data.from</p>
        <p>to: data.to</p>
        <p>to: data.departure</p>
        <p>passengers: data.passengers</p>
        <p>driver: data.driver</p>
      </div>
      console.log(contents);
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
        <section>
          <button onClick={() => this.queryAndShow()}>view sidebar</button>
        </section>
        <SkyLight
          dialogStyles={styles.details}
          closeButtonStyle={styles.close}
          titleStyle={styles.title}
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
