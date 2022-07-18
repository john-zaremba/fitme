import React from "react"

const ProfileSummary = (props) => {
  const { user } = props
  let activityLevel

  switch(user.activityLevel) {
    case 1: 
      activityLevel = "Sedentary"
      break
    case 2:
      activityLevel = "Lightly Active"
      break
    case 3:
      activityLevel = "Moderately Active"
      break
    case 4:
      activityLevel = "Vigorously Active"
      break
    case 5:
      activityLevel = "Extremely Active"
      break
  }

  return (
    <div className="bmr-form">
      <h3 className="text-center">Profile Summary</h3><br />
      <p className="profile-stat">Age: {user.age}</p>
      <p className="profile-stat">Height: {user.height} in</p>
      <p className="profile-stat">Weight: {user.weight} lbs</p>
      <p className="profile-stat">Sex: {user.sex}</p>
      <p className="profile-stat">Activity Level: {activityLevel}</p>
      <p className="profile-stat">BMR: {(user.bmr).toLocaleString("en-US")} calories</p>
    </div>
  )
}

export default ProfileSummary