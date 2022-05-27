import React, { useState } from "react"
import config from "../../config"
import FormError from "../layout/FormError"

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})

  const validateInput = (payload) => {
    setErrors({})
    const { email, password } = payload
    const emailRegexp = config.validation.email.regexp.emailRegex
    let newErrors = {}
    let isValid = true

    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      }
      isValid = false
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      }
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const isValid = validateInput(userPayload)
   
    try {
      if (isValid) {
        const response = await fetch("/api/v1/user-sessions", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          })
        })
        if(!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
        const userData = await response.json()
        setShouldRedirect(true)
      }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  if (shouldRedirect) {
    location.href = "/logs"
  }

  return (
    <div className="grid-container" onSubmit={onSubmit}>
      <div className="sign-form">
        <h1>Sign In</h1>
        <form>
          <div>
            <label>
              Email
              <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
              />
              <FormError error={errors.password} />
            </label>
          </div>
          <div>
            <input type="submit" className="my-button" value="Sign In" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInForm