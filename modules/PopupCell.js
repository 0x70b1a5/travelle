import React from 'react'
import DetailView from './DetailView.js'

export default React.createClass({
  getInitialState() {
    return {
      ride: this.props.ride
    }
  },
  componentWillReceiveProps(nextProps){
    this.setState({
      ride: nextProps.ride
    })
  },
  render () {
    return (
      <td className={"cell "+this.props.theme}>
        <DetailView ride={this.state.ride} />
      </td>
    )
  }
})
