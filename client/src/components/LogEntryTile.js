import React from "react"

const LogEntryTile = (props) => {
  const { name, quantity, calories, fat, protein, carbs } = props.entry
  return (
    <div className="callout grid-x">
      <p className="cell small-2">{name}</p>
      <p className="cell small-2">{quantity}</p>
      <p className="cell small-2">{calories}</p>
      <p className="cell small-2">{fat}g</p>
      <p className="cell small-2">{protein}g</p>
      <p className="cell small-2">{carbs}g</p>
    </div>
  )
}

export default LogEntryTile