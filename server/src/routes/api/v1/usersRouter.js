import express from "express"
import passport from "passport"
import { User } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import ConvertUserInput from "../../../services/ConvertUserInput.js"

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

usersRouter.put("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  console.log(ConvertUserInput(formInput))
})

export default usersRouter