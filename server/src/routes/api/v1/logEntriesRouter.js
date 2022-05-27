import express from "express"
import objection from "objection"
import { Log } from "../../../models/index.js"
import NutritionIxClient from "../../../apiClient/NutritionIxClient.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import LogEntrySerializer from "../../../serializers/LogEntrySerializer.js"
import ConsumableSerializer from "../../../serializers/ConsumableSerializer.js"
import LogSerializer from "../../../serializers/LogSerializer.js"

const { ValidationError } = objection
const logEntriesRouter = new express.Router({ mergeParams: true })

logEntriesRouter.post("/", async (req, res) => {
  const { logId } = req.params
  const userId = req.user.id
  const { body } = req
  const formInput = cleanUserInput(body)
  const { entryQuery } = formInput
  
  if (userId === "1" || userId === "2") {
    try {
      const log = await Log.query().findById(logId)
      const nutritionIxResponse = await NutritionIxClient.naturalSearch(entryQuery, userId)
      const nutritionData = JSON.parse(nutritionIxResponse)
      const serializedData = LogEntrySerializer.getSummary(nutritionData)
      await log.addEntry(serializedData)
      const serializedLog = await LogSerializer.getDetail(log)

      return res.status(201).json({ log: serializedLog })
    } catch (error) {
      return res.status(500).json({ errors: error })
    }
  } else {
    return res.status(401).json({ errors: "Unauthorized request: please sign in to demo account" })
  }
})

export default logEntriesRouter