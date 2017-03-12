import React from 'react'

export default React.createClass({
  render() {
    var style = {maxHeight: "300px", maxWidth: "300px"}
    if (this.props.size == "small") {
      style = {maxHeight: "50px", maxWidth: "50px"}
    }
    return (
      <img style={style} src={this.props.img.replace(/public\//,'')} />
    )
  }
})
