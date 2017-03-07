import React from 'react'
import Cell from './Cell.js'
import PopupCell from './PopupCell.js'

export default React.createClass({
  render() {
    var theme = this.props.theme;
    var cols = this.props.cells;
    return (
      <tr className={"row"}>
        <Cell theme={theme+" break-word"} data={cols.from} />
        <Cell theme={theme+" break-word"} data={cols.to} />
        <Cell theme={theme+" break-word"} data={cols.departure} />
        <Cell theme={theme+" break-word"} data={cols.passengers} />
        <Cell theme={theme+" break-word"} data={cols.driver} />
        <PopupCell ride={cols.id} />
      </tr>
    )
  }
})
