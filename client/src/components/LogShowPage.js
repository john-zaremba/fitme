import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import LogEntryTile from "./LogEntryTile"
import translateServerErrors from "../services/translateServerErrors"
import NaturalSearchForm from "./NaturalSearchForm"
import SummaryChart from "./SummaryChart"
import CalorieChart from "./CalorieChart"
import getLogEntries from "../services/getLogEntries"
import postLogEntry from "../services/postLogEntry"

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
  
  const fetchLogEntries = async (id) => {
    try {
      const log = await getLogEntries(id)
      log === 401 ? setShouldRedirect(true) : setLog(log)
    } catch (error) {
      console.error(error)
    }
  }

  const handlePost = async (id, formInput) => {
    try {
      const log = await postLogEntry(id, formInput)
      if (log.errors) {
        setErrors(log.errors)
      } else {
        const { entries, total, macros } = log

        setErrors([])
        setLog({
          ...log,
          entries,
          total,
          macros
        })
      }
    } catch (error) {
      console.error(error)
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
    fetchLogEntries(id)
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
          handlePost={handlePost}
          date={log.date}
          total={log.total}
          id={id}
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