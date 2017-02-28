import React from 'react'

export default React.createClass({
  render () {
    return (
      <td className={"cell "+this.props.theme}>
        {this.props.data}
        {this.props.children}
      </td>
    )
  }
})
