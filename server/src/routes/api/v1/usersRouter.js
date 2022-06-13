import express from "express"
import passport from "passport"
import { User } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import ConvertUserInput from "../../../services/ConvertUserInput.js"
import UserSerializer from "../../../serializers/UserSerializer.js"

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password })
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser })
    });
  } catch (error) {
    return res.status(422).json({ errors: error })
  }
})

usersRouter.patch("/", async (req, res) => {
  try {
    const { body, user } = req
    const formInput = cleanUserInput(body)
    const {
      age,
      height,
      weight,
      activityLevel,
      sex,
      bmr
    } = ConvertUserInput(formInput)
    const currentUser = await User.query().findById(user.id)
    const updatedUser = await currentUser.$query()
      .patchAndFetch({
        age,
        height,
        weight,
        activityLevel,
        sex,
        bmr
      })
    const serializedUser = UserSerializer.getSummary(updatedUser)

    return res.status(200).json({ user: serializedUser })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default usersRouter