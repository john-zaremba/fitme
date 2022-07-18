import React, { useState } from "react"
import ReactTooltip from "react-tooltip"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

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
  const [errors, setErrors] = useState([])
  let errorsList

  if (errors.length > 0) {
    errorsList = (
      <div>
        <p>
          Please fill out required fields:
        </p>
        <div className="grid-x grid-margin-x">
          {errors}
          <br />
        </div>
      </div>
    )
  }

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
    let completed = true
    const errorsArray = []

    for (const attribute in userInfo) {
      if (userInfo[attribute] === "") {
        completed = false
        if (attribute === "activityLevel") {
          errorsArray.push(<p className="bmr-error">activity level</p>)
        } else {
          errorsArray.push(<p className="bmr-error">{attribute}</p>)
        }
      }
    }

    if (errorsArray.length > 0) {
      setErrors(errorsArray)
    }

    if (completed) {
      patchUserInfo(userInfo)
      setErrors([])
      setUserInfo({
        age: "",
        feet: "",
        inches: "",
        weight: "",
        activityLevel: "",
        sex: ""
      })
    }
  }

  return (
    <div className="bmr-form">
      <div>
        <FontAwesomeIcon className="tip-icon" icon={faQuestion} data-tip data-for="example" />
        <ReactTooltip id="example" className="my-tip" place="left" effect="solid">
          <h5>
            Base Metabolic Rate (BMR) <br /> 
          </h5>
          <p>
            This calculator uses the Harris-Benedict formula to estimate <br />
            how many calories you burn every 24 hours.
          </p>
        </ReactTooltip>
      </div>
      <form className="bmr-format" onSubmit={handleSubmit}>
        <h3 className="text-center">BMR Calculator</h3>
        <br />
        {errorsList}
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
          Weekly Exercise <br />
          <input
            type="radio"
            name="activityLevel"
            value="1"
            checked={userInfo.activityLevel === "1"}
            onChange={handleInputChange}
          />
          <label>Little to none</label><br />
          <input
            type="radio"
            name="activityLevel"
            value="2"
            checked={userInfo.activityLevel === "2"}
            onChange={handleInputChange}
          />
          <label>1 - 3 days</label><br />
          <input
            type="radio"
            name="activityLevel"
            value="3"
            checked={userInfo.activityLevel === "3"}
            onChange={handleInputChange}
          />
          <label>3 - 5 days</label><br />
          <input
            type="radio"
            name="activityLevel"
            value="4"
            checked={userInfo.activityLevel === "4"}
            onChange={handleInputChange}
          />
          <label>6 - 7 days</label><br />
          <input
            type="radio"
            name="activityLevel"
            value="5"
            checked={userInfo.activityLevel === "5"}
            onChange={handleInputChange}
          />
          <label>2 times per day</label>
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