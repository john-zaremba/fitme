import React, { useState } from "react"

const LogEntryTile = (props) => {
  const { id, entryId, name, unit, quantity, calories, fat, protein, carbs } = props.entry
  const { deleteLogEntry } = props
  let deleteButton

  const handleDelete = () => {
    deleteLogEntry(entryId)
  }


  deleteButton = <td className="button alert" onClick={handleDelete}>Delete</td>
 
  return (
    <tr>
      <td>{name}</td>
      <td>{unit}</td>
      <td>{quantity}</td>
      <td>{calories}</td>
      <td>{fat}g</td>
      <td>{protein}g</td>
      <td>{carbs}g</td>
      {deleteButton}
    </tr>
  )
}

export default LogEntryTile