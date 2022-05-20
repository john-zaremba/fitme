import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import LogEntryTile from "./LogEntryTile"
import translateServerErrors from "../services/translateServerErrors"
import NaturalSearchForm from "./NaturalSearchForm"

const LogShowPage = (props) => {
  const [log, setLog] = useState({
    userId: null,
    date: "",
    entries: []
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState([])
  const { id } = useParams()

  const getLogEntries = async () => {
    try {
      const response = await fetch(`/api/v1/logs/${id}`)
      if (!response.ok) {
        if (response.status === 401) {
          setShouldRedirect(true)
        } else {
          const error = new Error(`Error in fetch: ${response.status} (${response.statusText})`)
          throw error
        }
      }
      const responseBody = await response.json()
      setLog(responseBody.log)
    } catch (error) {
      console.error(error.message)
    }
  }

  const postLogEntry = async (formInput) => {
    try {
      const response = await fetch(`/api/v1/logs/${id}/entries`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formInput)
      })

      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const error = new Error(`Error in fetch: ${error.status} (${error.statusText})`)
          throw error
        }
      } else {
        const responseBody = await response.json()
        const updatedEntries = [...log.entries, responseBody.logEntry]
        setErrors([])
        setLog({ ...log, entries: updatedEntries })
      }
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

  if (shouldRedirect) {
    location.href = "/logs"
  }
  
  return (
    <div className="grid-container">
      <h3>Nutrition Log: {log.date}</h3>
      <NaturalSearchForm 
        postLogEntry={postLogEntry}
      />
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

export default LogShowPage