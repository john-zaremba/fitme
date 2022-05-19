import React from "react"
import { Link } from "react-router-dom"

const LogTile = (props) => {
  const { id, date } = props.log
  return (
    <div className="log-tile">
    <h5>
      <Link to={`logs/${id}`}>
        {date}
      </Link>
    </h5>
  </div>
  )
}

export default LogTile