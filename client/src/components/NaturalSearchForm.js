import React, { useState } from "react"
import ReactTooltip from "react-tooltip"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { useClickOutside } from "../services/useClickOutside"

const NaturalSearchForm = (props) => {
  const { handlePost, date, errorContainer, id } = props
  const [newEntry, setNewEntry] = useState({ entryQuery: "" })
  const [suggestions, setSuggestions] = useState([])
  const autoRef = useClickOutside(() => setSuggestions([]))
  let suggestionsList

  const handleAutoClick = (event) => {
    const entryArray = newEntry.entryQuery.split("")
    const text = event.currentTarget.innerText

    if (entryArray[entryArray.length - 1] === " ") {
      entryArray.push(text)
      let replacementText = ""
      entryArray.forEach((entry) => {
        replacementText += entry
      })

      setNewEntry({
        ...newEntry,
        entryQuery: replacementText
      })
      setSuggestions([])
    } else {
      const newArray = entryArray.join("").split(" ")
      newArray.splice(newArray.length - 1, 1, text)
      const replacementText = newArray.join(" ")
      
      setNewEntry({
        ...newEntry,
        entryQuery: replacementText
      })
      setSuggestions([])
    }
  }

  const suggestionElements = suggestions.map((suggestion, index) => {
    return (
      <li key={index} className="list-group-item" onClick={handleAutoClick}>
        {suggestion}
      </li>
    )
  })

  if (suggestions.length > 0 && newEntry.entryQuery !== "") {
    suggestionsList = (
      <ul className="list-group" ref={autoRef}>
        {suggestionElements}
      </ul>
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
    handlePost(id, newEntry)
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
            className="my-input rounded"
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