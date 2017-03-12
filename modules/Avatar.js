import React from 'react'

export default React.createClass({
  render() {
    return (
      <img style={{maxHeight: "300px", maxWidth: "300px"}} src={this.props.img.replace(/public\//,'')} />
    )
  }
})
