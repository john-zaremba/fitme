import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Log } from "../../../models/index.js"
import NutritionIxClient from "../../../apiClient/nutritionIxClient.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import LogEntrySerializer from "../../../serializers/LogEntrySerializer.js"
import "dotenv/config"

const appId = process.env.NUTRITIONIX_APPLICATION_ID
const apiKey = process.env.NUTRITIONIX_API_KEY
const logEntriesRouter = new express.Router({ mergeParams: true })

logEntriesRouter.post("/", async (req, res) => {
  const { logId } = req.params
  const { body } = req
  const formInput = cleanUserInput(body)
  const { entryQuery } = formInput
  try {
    const log = await Log.query().findById(logId)
    const nutritionIxResponse = await NutritionIxClient.naturalSearch(entryQuery.toString(), appId, apiKey)
    const nutritionData = JSON.parse(nutritionIxResponse)
    const serializedData = LogEntrySerializer.getSummary(nutritionData)
    const logEntry = await log.$relatedQuery("consumables").insertAndFetch(serializedData)
    
    return res.status(201).json({ logEntry })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default logEntriesRouter