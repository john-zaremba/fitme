import React, { useState, useEffect } from "react"
import LogTile from "./LogTile"

const LogListPage = (props) => {
  const [logs, setLogs] = useState([])

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

  return (
    <div className="grid-container">
      <div className="log-list-container">
        <h3>
          My Logs
        </h3>
        <div className="log-list">
          {logsList}
        </div>
      </div>
    </div>
  )
}

export default LogListPage