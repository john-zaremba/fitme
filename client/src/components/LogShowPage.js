import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import LogEntryTile from "./LogEntryTile"
import translateServerErrors from "../services/translateServerErrors"
import NaturalSearchForm from "./NaturalSearchForm"
import SummaryChart from "./SummaryChart"
import CalorieChart from "./CalorieChart"

const LogShowPage = (props) => {
  const [log, setLog] = useState({
    userId: null,
    date: "",
    entries: [],
    total: {},
    macros: {}
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState([])
  const { id } = useParams()
  let errorContainer

  if (errors.length > 0) {
    errorContainer = (
      <div className="post-error">
        {errors}
      </div>
    )
  }

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
        if (response.status === 401) {
          const body = await response.json()
          setErrors(body.errors)
        } else if (response.status === 404) {
          const responseBody = await response.json()
          setErrors(responseBody.errors)
        } else if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const error = new Error(`Error in fetch: ${error.status} (${error.statusText})`)
          throw error
        }
      } 

      const responseBody = await response.json()
      const { entries, total, macros } = responseBody.log
      
      setErrors([])
      setLog({ 
        ...log, 
        entries,
        total,
        macros
      })
    } catch (error) {
      console.error(error.message)
    }
  }
  
  const deleteLogEntry = async (entryId) => {
    try {
      const response = await fetch(`/api/v1/entries/${entryId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })

      if (!response.ok) {
        const error = new Error(`Error in fetch: ${error.status} (${error.statusText})`)
        throw error       
      }

      const responseBody = await response.json()
      const { entries, total, macros } = responseBody.log
     
      setLog({
        ...log,
        entries,
        total,
        macros
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  const patchLogEntry = async (entryId, patchData) => {
    try {
      const response = await fetch(`/api/v1/entries/${entryId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(patchData)
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
      }

      const responseBody = await response.json()
      const { entries, total, macros } = responseBody.log

      setErrors([])
      setLog({
        ...log,
        entries,
        total,
        macros
      })
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
        key={entry.entryId}
        entry={entry}
        deleteLogEntry={deleteLogEntry}
        patchLogEntry={patchLogEntry}
      />
    )
  })

  if (shouldRedirect) {
    location.href = "/logs"
  }
  
  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <NaturalSearchForm 
          postLogEntry={postLogEntry}
          date={log.date}
          total={log.total}
          errorContainer={errorContainer}
        />
        <CalorieChart 
          user={props.user} 
          total={log.total} 
        />
      </div>
      <SummaryChart log={log} />
      <div className="table-wrapper">
        <table className="entry-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Calories</th>
              <th>Fat</th>
              <th>Protein</th>
              <th>Carbs</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {logEntriesList}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LogShowPage