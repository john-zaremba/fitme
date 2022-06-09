import React, { useState } from "react"
import UserInfoForm from "./UserInfoForm"
import translateServerErrors from "../services/translateServerErrors"

const UserProfilePage = (props) => {
  const [errors, setErrors] = useState([])

  const putUserInfo = async (formInput) => {
    try {
      const response = await fetch("/api/v1/users", {
        method: "PUT",
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
      console.log(responseBody.userProfile)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="grid-container">
      <UserInfoForm 
        user={props.user} 
        putUserInfo={putUserInfo}
      />
    </div>
  )
}

export default UserProfilePage