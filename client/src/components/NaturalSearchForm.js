import React, { useState } from "react"

const NaturalSearchForm = (props) => {
  const { postLogEntry, date, total } = props
  const [newEntry, setNewEntry] = useState({ entryQuery: "" })

  const handleInputChange = (event) => {
    setNewEntry({
      ...newEntry,
      [event.currentTarget.name]: event.currentTarget.value
    })
  } 

  const handleSubmit = (event) => {
    event.preventDefault()
    postLogEntry(newEntry)
    clearForm()
  }

  const clearForm = () => {
    setNewEntry({ entryQuery: "" })
  }

  return (
    <div className="form">
      <h4>Nutrition Log: {date}</h4>
      <p>Calorie Count: {total.calories}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Easy Add:
          <input
            type="text"
            name="entryQuery"
            value={newEntry.entryQuery}
            onChange={handleInputChange}
          />
        </label>
        <input className="my-button" type="submit" value="Submit" />
        <p className="reference">Powered by Nutritionix</p>
      </form>
    </div>
  )
}

export default NaturalSearchForm