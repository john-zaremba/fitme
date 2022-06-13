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
      setCurrentUser(responseBody.user)
      console.log(responseBody.user)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="grid-container">
      <ProfileSummary 
        user={props.user}
      />
      <UserInfoForm 
        user={props.user} 
        patchUserInfo={patchUserInfo}
      />
    </div>
  )
}

export default UserProfilePage