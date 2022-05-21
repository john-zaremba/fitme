import React from "react"
import { Link } from "react-router-dom"

const LogTile = (props) => {
  const { id, date } = props.log
  return (
    <div className="log-tile">
      <Link to={`logs/${id}`}>
        <table className="hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Calories</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{date}</td>
              <td>2,700</td>
            </tr>
          </tbody>
        </table>
      </Link>
    </div>
  )
}

export default LogTile