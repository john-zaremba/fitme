import React from "react"
import { Link } from "react-router-dom";

const LandingPage = (props) => {
  const { user } = props
  const url = user ? "/logs" : "/user-sessions/new"

  return (
    <div className="grid-container">
      <div className="landing-page">
        <h2 className="landing-page-header">My Easy Tracker</h2>
        <h5 className="landing-page-subheader">Nutrition tracking made fast, <br /> easy, and accessible</h5>
        <Link to={url} className="landing-button">
          Start Tracking Now
        </Link>
      </div>
    </div>
  )
}

export default LandingPage