import React, { useState } from "react"

const NaturalSearchForm = (props) => {
  const { postLogEntry } = props
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
    <div className="callout">
      <h4>Easy Add</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Entry:
          <input
            type="text"
            name="entryQuery"
            value={newEntry.entryQuery}
            onChange={handleInputChange}
          >
          </input>
        </label>
        <div className="button-group">
          <input className="button" type="submit" value="submit" />
        </div>
      </form>
    </div>
  )
}

export default NaturalSearchForm