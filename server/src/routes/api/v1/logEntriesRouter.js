import express from "express"
import objection from "objection"
import { Log } from "../../../models/index.js"
import NutritionIxClient from "../../../apiClient/nutritionIxClient.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import LogEntrySerializer from "../../../serializers/LogEntrySerializer.js"

const { ValidationError } = objection
const logEntriesRouter = new express.Router({ mergeParams: true })

logEntriesRouter.post("/", async (req, res) => {
  const { logId } = req.params
  const { body } = req
  const formInput = cleanUserInput(body)
  const { entryQuery } = formInput
  
  try {
    const log = await Log.query().findById(logId)
    const nutritionIxResponse = await NutritionIxClient.naturalSearch(entryQuery.toString())
    const nutritionData = JSON.parse(nutritionIxResponse)
    const serializedData = LogEntrySerializer.getSummary(nutritionData)
    await log.addEntry(serializedData)

    return res.status(201).json({ logEntry: serializedData })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default logEntriesRouter