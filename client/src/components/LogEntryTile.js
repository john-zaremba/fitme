import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons'

const LogEntryTile = (props) => {
  const { entryId, name, unit, quantity, calories, fat, protein, carbs } = props.entry
  const { deleteLogEntry, patchLogEntry } = props
  const [editing, setEditing] = useState(false)
  const [newQuantity, setNewQuantity] = useState({ quantity: "" })
  const [patchErrors, setPatchErrors] = useState([])
  let leftButton
  let rightButton
  let entryQuantity
  let buttonCollection
  let errorContainer

  if (patchErrors.length > 0) {
    errorContainer = (
      <td className="patch-error">
        {patchErrors}
      </td>
    )
  }

  const handleDelete = () => {
    deleteLogEntry(entryId)
  }
  
  const handleInputChange = (event) => {
    setNewQuantity({
      ...newQuantity,
      [event.currentTarget.name]: event.currentTarget.value
    })
  } 

  const handleSubmit = (event) => {
    event.preventDefault()
    const quantity = Number(newQuantity.quantity)

    if (quantity % 1 === 0 && quantity > 0) {
      setPatchErrors([])
      patchLogEntry(entryId, newQuantity)
      setNewQuantity({ quantity: "" })
      setEditing(false)
    } else {
      setPatchErrors(
        "Please enter a positive whole number"
      )
    }
  }

  const handleEditClick = () => {
    setEditing(true)
  }

  const handleCancelClick = () => {
    setEditing(false)
    setNewQuantity({ quantity: "" })
    setPatchErrors([])
  }


  if (editing) {
    entryQuantity = (
      <form onSubmit={handleSubmit}>
        <input
          className="rounded"
          type="number"
          name="quantity"
          value={newQuantity.quantity}
          onChange={handleInputChange}
        />
      </form>
    )
  } else {
    entryQuantity = quantity
  }

  if (!editing) {
    leftButton = (
      <FontAwesomeIcon 
        className="my-icon" 
        icon={faPenToSquare} 
        onClick={handleEditClick} 
      />
    )
    rightButton = (
      <FontAwesomeIcon 
        className="my-icon" 
        icon={faTrash} 
        onClick={handleDelete} 
      />
    )
    buttonCollection = <td width="5%">{leftButton}{rightButton}</td>
  } else if (editing) {
    leftButton = (
      <FontAwesomeIcon 
        className="my-icon" 
        icon={faCheck} 
        onClick={handleSubmit} 
      />
    )
    rightButton = (
      <FontAwesomeIcon 
        className="my-icon"
        icon={faX} 
        onClick={handleCancelClick} 
      />
    )
    buttonCollection = <td width="5%">{leftButton}{rightButton}</td>
  } 
  
  return (
    <tr>
      <td>{name}</td>
      <td width="25%">{unit}</td>
      <td width="10%">{entryQuantity}</td>
      <td>{calories}</td>
      <td>{fat}g</td>
      <td>{protein}g</td>
      <td>{carbs}g</td>
      {buttonCollection}
      {errorContainer} 
    </tr>
  )
}

export default LogEntryTile