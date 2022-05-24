import React, { useState } from "react"

const LogEntryTile = (props) => {
  const { id, name, unit, quantity, calories, fat, protein, carbs } = props.entry
  const { deleteLogEntry, patchLogEntry } = props
  const [editing, setEditing] = useState(false)
  const [newQuantity, setNewQuantity] = useState({ quantity: "" })
  let leftButton
  let rightButton
  let entryQuantity
  let buttonCollection

  const handleDelete = () => {
    deleteLogEntry(id)
  }
  
  const handleInputChange = (event) => {
    setNewQuantity({
      ...newQuantity,
      [event.currentTarget.name]: [event.currentTarget.value]
    })
  } 


  const handleSubmit = (event) => {
    event.preventDefault()
    patchLogEntry(id, newQuantity)
    setEditing(false)
  }

  const handleEditClick = () => {
    setEditing(true)
  }

  const handleCancelClick = () => {
    setEditing(false)
  }


  if (editing) {
    entryQuantity = <form onSubmit={handleSubmit}>
      <div className="grid-x grid-margin-x">
      <input
        className="cell small-2"
        type="text"
        name="quantity"
        value={newQuantity.quantity}
        onChange={handleInputChange}
      />
      <input className="cell small-3 button" type="submit" value="Submit" />
      
      </div>
    </form>
  } else {
    entryQuantity = quantity
  }

  if (!editing) {
    leftButton = <div className="my-button secondary" onClick={handleEditClick}>Edit</div>
    rightButton = <div className="my-button alert" onClick={handleDelete}>Delete</div>
    buttonCollection = <td className="button-group">{leftButton}{rightButton}</td>
  } else if (editing) {
    leftButton = <td className="my-button" onClick={handleEditClick}>Submit</td>
    rightButton = <td className="my-button alert" onClick={handleCancelClick}>Cancel</td>
    buttonCollection = <td className="button-group">{leftButton}{rightButton}</td>
  } 

  return (
    <tr>
      <td>{name}</td>
      <td>{unit}</td>
      <td>{entryQuantity}</td>
      <td>{calories}</td>
      <td>{fat}g</td>
      <td>{protein}g</td>
      <td>{carbs}g</td>
      {buttonCollection}
    </tr>
  )
}

export default LogEntryTile