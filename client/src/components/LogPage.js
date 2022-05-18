import React, { useState, useEffect } from "react"
import LogEntryTile from "./LogEntryTile"

const LogPage = (props) => {
  const [log, setLog] = useState({
    userId: null,
    date: "",
    entries: []
  })
  const logId = props.match.params.id

  const getLogEntries = async () => {
    try {
      const response = await fetch(`/api/v1/logs/${logId}`)
      if (!response.ok) {
        const error = new Error(`Error in fetch: ${response.status} (${response.statusText})`)
        throw error
      }
      const responseBody = await response.json()
      setLog(responseBody.log)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getLogEntries()
  }, [])

  const logEntriesList = log.entries.map((entry) => {
    return (
      <LogEntryTile 
        key={entry.id}
        entry={entry} 
      />
    )
  })

  return (
    <div className="grid-container">
      <h3>Nutrition Log</h3>
      <table className="hover">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Calories</th>
            <th>Fat</th>
            <th>Protein</th>
            <th>Carbs</th>
          </tr>
        </thead>
        <tbody>
          {logEntriesList}
        </tbody>
      </table>
    </div>
  )
}

export default LogPage