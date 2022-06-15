import React, { useState } from "react"
import UserInfoForm from "./UserInfoForm"
import translateServerErrors from "../services/translateServerErrors"
import ProfileSummary from "./ProfileSummary"

const UserProfilePage = (props) => {
  const [errors, setErrors] = useState([])
  const { setCurrentUser } = props

  const patchUserInfo = async (formInput) => {
    try {
      const response = await fetch("/api/v1/users", {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formInput)
      })

      if (!response.ok) {
        const error = new Error(`Error in fetch: ${error.status} (${error.statusText})`)
        throw error
      }

      const responseBody = await response.json()
      setCurrentUser(responseBody.user)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="grid-container">
      <div className="grid-x">
        <ProfileSummary 
          user={props.user}
        />
        <UserInfoForm 
          user={props.user} 
          patchUserInfo={patchUserInfo}
        />
      </div>
    </div>
  )
}

export default UserProfilePage