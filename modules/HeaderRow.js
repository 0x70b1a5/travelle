import React from 'react'
import Cell from './Cell.js'

export default React.createClass({
  render() {
    var theme = this.props.theme;
    var cells = this.props.cells.map((cell,i)=>{
      return <Cell key={i} theme={theme} data={cell}/>
    });
    return (
      <tr className={"row"}>
        {cells}
      </tr>
    )
  }
})
