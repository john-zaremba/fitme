import express from "express"
import { Consumable } from "../../../models/index.js"
import ConsumableSerializer from "../../../serializers/ConsumableSerializer.js"

const logsRouter = new express.Router()

logsRouter.get("/", async (req, res) => {
  try {
    const logEntries = await Consumable.query()
    const serializedLogEntries = logEntries.map((entry) => {
      return ConsumableSerializer.getSummary(entry)
    })
    return res.status(200).json({ logEntries: serializedLogEntries })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default logsRouter