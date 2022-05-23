import React, { useState } from "react"

const NaturalSearchForm = (props) => {
  const { postLogEntry, date } = props
  const [newEntry, setNewEntry] = useState({ entryQuery: "" })

  const handleInputChange = (event) => {
    setNewEntry({
      ...newEntry,
      [event.currentTarget.name]: [event.currentTarget.value]
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
      <form onSubmit={handleSubmit}>
        <label>
          Easy Add:
          <input
            type="text"
            name="entryQuery"
            value={newEntry.entryQuery}
            onChange={handleInputChange}
          >
          </input>
        </label>
        <div>
          <input className="my-button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default NaturalSearchForm