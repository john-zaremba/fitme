import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

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

  const logsList = logs.map(log => {
    return (
      <div className="log-tile">
        <h5>
          <Link to={`logs/${log.id}`}>
            {log.date}
          </Link>
        </h5>
      </div>
    )
  })

  return (
    <div className="grid-container">
      <h1>
        My Logs
      </h1>
      <div className="log-list">
        {logsList}
      </div>
    </div>
  )
}

export default LogListPage