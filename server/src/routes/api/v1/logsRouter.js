import express from "express"
import { Consumable, Log } from "../../../models/index.js"
import LogSerializer from "../../../serializers/LogSerializer.js"

const logsRouter = new express.Router()

logsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const log = await Log.query().findById(id)
    const serializedLog = await LogSerializer.getDetail(log)
    return res.status(200).json({ log: serializedLog })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default logsRouter