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
      <div className="bmr-format">
        <h3>Profile Summary</h3>
        <p>Age: {user.age}</p>
        <p>Height: {user.height} in</p>
        <p>Weight: {user.weight} lbs</p>
        <p>Sex: {user.sex}</p>
        <p>Activity Level: {activityLevel}</p>
      </div>
    </div>
  )
}

export default ProfileSummary