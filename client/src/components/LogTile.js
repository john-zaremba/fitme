import React from "react"
import { Link } from "react-router-dom"

const LogTile = (props) => {
  const { id, date, totalCalories } = props.log
  return (
    <div className="log-tile">
      <Link to={`logs/${id}`}>
        <table className="hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{date}</td>
              <td>{totalCalories}</td>
            </tr>
          </tbody>
        </table>
      </Link>
    </div>
  )
}

export default LogTile