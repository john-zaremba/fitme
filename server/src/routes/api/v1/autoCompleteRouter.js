import express from "express"
import TypewiseAIClient from "../../../apiClient/TypewiseAIClient.js"

const autoCompleteRouter = new express.Router()

autoCompleteRouter.post("/", async (req, res) => {
  const { body } = req
  console.log(body)
  console.log("working")
  try {
    const suggestions = await TypewiseAIClient.autoComplete(body.entryQuery)
    console.log(suggestions)
    return res.status(200).json({ suggestions })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default autoCompleteRouter