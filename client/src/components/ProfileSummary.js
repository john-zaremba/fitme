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
      <div className="grid-y">
        <br />
        <h3 className="text-center">Profile Summary</h3><br />
        <p className="profile-stat"><strong>Age: </strong>{user.age}</p>
        <p className="profile-stat"><strong>Height: </strong>{user.height} in</p>
        <p className="profile-stat"><strong>Weight: </strong>{user.weight} lbs</p>
        <p className="profile-stat"><strong>Sex: </strong>{user.sex}</p>
        <p className="profile-stat"><strong>Activity Level: </strong>{activityLevel}</p>
        <p className="profile-stat"><strong>BMR: </strong>{(user.bmr).toLocaleString("en-US")} calories</p>
      </div>
    </div>
  )
}

export default ProfileSummary