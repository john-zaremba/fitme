import React, { useState, useEffect } from "react"
import LogEntryTile from "./LogEntryTile"

const LogPage = (props) => {
  const [logEntries, setLogEntries] = useState([])

  const getLogEntries = async () => {
    try {
      const response = await fetch("/api/v1/log")
      if (!response.ok) {
        const error = new Error(`Error in fetch: ${response.status} (${response.statusText})`)
        throw error
      }
      const responseBody = await response.json()
      setLogEntries(responseBody.logEntries)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getLogEntries()
  }, [])

  const logEntriesList = logEntries.map((entry) => {
    return (
      <LogEntryTile 
        key={entry.id}
        entry={entry} 
      />
    )
  })

  return (
    <div className="grid-container">
      <div className="grid-y">
        <h1>My Nutrition Log</h1>
        <div className="callout">
          <div className="cell">
            <div className="callout grid-x">
              <p className="cell small-2">name</p>
              <p className="cell small-2">quantity</p>
              <p className="cell small-2">calories</p>
              <p className="cell small-2">fat</p>
              <p className="cell small-2">protein</p>
              <p className="cell small-2">carbs</p>
            </div>
          </div>
          <div className="cell">
            {logEntriesList}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogPage