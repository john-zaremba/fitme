import React, { useState } from "react"

const UserInfoForm = (props) => {
  const { patchUserInfo } = props
  const [userInfo, setUserInfo] = useState({
    age: "",
    feet: "",
    inches: "",
    weight: "",
    activityLevel: "",
    sex: ""
  })

  const handleInputChange = (event) => {
    const target = event.currentTarget
    if (target.type === "radio") {
      if (target.checked) {
        setUserInfo({
          ...userInfo,
          [target.name]: target.value
        })
      }
    } else {
      setUserInfo({
        ...userInfo,
        [target.name]: target.value
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    patchUserInfo(userInfo)
    setUserInfo({
      age: "",
      feet: "",
      inches: "",
      weight: "",
      activityLevel: "",
      sex: ""
    })
  }

  return (
    <div className="bmr-form">
      <form className="bmr-format" onSubmit={handleSubmit}>
        <h3 className="text-center">BMR Calculator</h3>
        <br />
        <div className="grid-x grid-margin-x">
          <label className="bmr-entry">
            Age
            <input 
              className="rounded"
              type="number"
              name="age"
              value={userInfo.age}
              onChange={handleInputChange}
            />
          </label>
          <label className="bmr-entry">
            Weight
            <input 
              className="rounded"
              placeholder="lbs"
              type="number"
              name="weight"
              value={userInfo.weight}
              onChange={handleInputChange}
              />
          </label>
        </div>
        <div className="grid-x grid-margin-x">
          <label className="bmr-entry">
            Height
            <input 
              className="rounded"
              placeholder="ft"
              type="number"
              name="feet"
              value={userInfo.feet}
              onChange={handleInputChange}
            />
          </label>
          <label className="bmr-entry">
            <br />
            <input
              className="rounded"
              placeholder="in"
              type="number"
              name="inches"
              value={userInfo.inches}
              onChange={handleInputChange}
              />
          </label>
        </div>
        <label className="bmr-entry">
          Sex <br />
          <input
            type="radio"
            name="sex"
            value="Female"
            checked={userInfo.sex === "Female"}
            onChange={handleInputChange}
          />
          <label>Female</label>
          <input
            type="radio"
            name="sex"
            value="Male"
            checked={userInfo.sex === "Male"}
            onChange={handleInputChange}
          />
          <label>Male</label>
        </label>
        <label className="bmr-entry">
          Activity Level <br />
          <input
            type="radio"
            name="activityLevel"
            value="1"
            checked={userInfo.activityLevel === "1"}
            onChange={handleInputChange}
          />
          <label>Sedentary: little or no exercise</label><br />
          <input
            type="radio"
            name="activityLevel"
            value="2"
            checked={userInfo.activityLevel === "2"}
            onChange={handleInputChange}
          />
          <label>Lightly Active: exercise 1-3 days / week</label><br />
          <input
            type="radio"
            name="activityLevel"
            value="3"
            checked={userInfo.activityLevel === "3"}
            onChange={handleInputChange}
          />
          <label>Moderately Active: exercise 3-5 days / week</label><br />
          <input
            type="radio"
            name="activityLevel"
            value="4"
            checked={userInfo.activityLevel === "4"}
            onChange={handleInputChange}
          />
          <label>Vigorously Active: exercise 6-7 days / week</label><br />
          <input
            type="radio"
            name="activityLevel"
            value="5"
            checked={userInfo.activityLevel === "5"}
            onChange={handleInputChange}
          />
          <label>Extremely Active: exercise 2 times / day</label>
        </label><br />
        <input
          type="submit"
          value="Calculate"
          className="my-button"
        />
      </form>
    </div>
  )
}

export default UserInfoForm