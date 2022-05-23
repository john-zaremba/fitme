import React from "react"

const LogEntryTile = (props) => {
  const { name, unit, quantity, calories, fat, protein, carbs } = props.entry
  return (
    <tr>
      <td>{name}</td>
      <td>{unit}</td>
      <td>{quantity}</td>
      <td>{calories}</td>
      <td>{fat}g</td>
      <td>{protein}g</td>
      <td>{carbs}g</td>
    </tr>
  )
}

export default LogEntryTile