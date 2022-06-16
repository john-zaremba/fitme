import React, { useState } from "react"
import ReactTooltip from "react-tooltip"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

const NaturalSearchForm = (props) => {
  const { postLogEntry, date, errorContainer } = props
  const [newEntry, setNewEntry] = useState({ entryQuery: "" })
  const [suggestions, setSuggestions] = useState([])
  let suggestionsList

  if (suggestions.length > 0) {
    const suggestionElements = suggestions.map((suggestion, index) => {
      return (
        <p key={index}>
          {suggestion}
        </p>
      )
    })
    suggestionsList = (
      <div>
        {suggestionElements}
      </div>
    )
  }

  const postAutoComplete = async (formInput) => {
    try {
      const response = await fetch("/api/v1/auto-complete", {
        method: "POST",
        headers: new Headers ({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formInput)
      })

      if (!response.ok) {
        const error = new Error(`Error in fetch: ${error.status} (${error.statusText})`)
        throw error
      }

      const responseBody = await response.json()
      setSuggestions(responseBody.suggestions)
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleInputChange = (event) => {
    const entry = {
      ...newEntry,
      [event.currentTarget.name]: event.currentTarget.value
    }
    setNewEntry({
      ...newEntry,
      [event.currentTarget.name]: event.currentTarget.value
    })

    if (entry.entryQuery === "") {
      setSuggestions([])
    } else {
      postAutoComplete(entry)
    }
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
            spellCheck="true"
            name="entryQuery"
            value={newEntry.entryQuery}
            onChange={handleInputChange}
          />
        </label>
        {suggestionsList}
        <br />
        <input className="my-button" type="submit" value="Submit" />
        <p className="reference">Powered by Nutritionix</p>
      </form>
    </div>
  )
}

export default NaturalSearchForm