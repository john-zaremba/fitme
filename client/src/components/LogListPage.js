import React, { useState, useEffect } from "react"
import LogTile from "./LogTile"

const LogListPage = (props) => {
  const [logs, setLogs] = useState([])
  const [newLog, setNewLog] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const getLogs = async () => {
    try {
      const response = await fetch("/api/v1/logs")
      if (!response.ok) {
        const error = new Error(`Error in fetch: ${error.status} (${error.statusText})`)
        throw error
      }
      const responseBody = await response.json()
      setLogs(responseBody.logs)
    } catch (error) {
      console.error(error.message)
    }
  }

  const postLog = async () => {
    try {
      const response = await fetch("/api/v1/logs", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })

      if (!response.ok) {
        const error = new Error(`Error in fetch: ${error.status} (${error.statusText})`)
        throw error
      }

      const responseBody = await response.json()
      setNewLog(responseBody.log)
      setShouldRedirect(true)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getLogs()
  }, [])

  const logsList = logs.map((log) => {
    return (
      <LogTile 
        key={log.id}
        log={log}
      />
    )
  })

  if (shouldRedirect) {
    location.href = `/logs/${newLog.id}`
  }

  return (
    <div className="grid-container">
      <div className="log-list-container">
        <h3 className="text-center">
          My Logs
        </h3>
        <div className="log-button" onClick={postLog}>
          Log My Day
        </div>
        <div className="log-list">
          {logsList}
        </div>
      </div>
    </div>
  )
}

export default LogListPage