import React, { useState } from "react"
import ReactTooltip from "react-tooltip"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

const NaturalSearchForm = (props) => {
  const { postLogEntry, date, errorContainer } = props
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
      <div>
        <FontAwesomeIcon className="tip-icon" icon={faQuestion} data-tip data-for="example" />
        <ReactTooltip id="example" className="my-tip" place="left" effect="solid">
          <h5>
            Sample Searches <br /> 
          </h5>
          <p>
            3 slices of pizza <br /> 
            2 tablespoons olive oil <br />
            1 large banana
          </p>
        </ReactTooltip>
      </div>
      <h4>Nutrition Log: {date}</h4>
      <br />
      {errorContainer}
      <form onSubmit={handleSubmit}>
        <label>
          Easy Add:
          <input
            className="rounded"
            type="text"
            name="entryQuery"
            value={newEntry.entryQuery}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <input className="my-button" type="submit" value="Submit" />
        <p className="reference">Powered by Nutritionix</p>
      </form>
    </div>
  )
}

export default NaturalSearchForm