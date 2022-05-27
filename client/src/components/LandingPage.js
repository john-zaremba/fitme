import React from "react"
import { Link } from "react-router-dom";

const LandingPage = (props) => {
  return (
    <div className="landing-page">
      <h2 className="landing-page-header">My Easy Tracker</h2>
      <h5 className="landing-page-subheader">Nutrition tracking made fast, <br /> easy, and accessible</h5>
      <Link to="/users/new" className="landing-button">
        Start Tracking Now
      </Link>
    </div>
  )
}

export default LandingPage