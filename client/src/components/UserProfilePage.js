import React, { userState } from "react"
import UserInfoForm from "./UserInfoForm"

const UserProfilePage = (props) => {
  return (
    <div className="grid-container">
      <UserInfoForm user={props.user} />
    </div>
  )
}

export default UserProfilePage