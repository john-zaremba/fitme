import express from "express"
import objection from "objection"
import { LogEntry } from "../../../models/index.js"
import LogSerializer from "../../../serializers/LogSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const entriesRouter = new express.Router()

entriesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const logEntry = await LogEntry.query().findById(id)
    const log = await logEntry.$relatedQuery("log")
    await LogEntry.query().deleteById(id)
    const updatedLog = await LogSerializer.getDetail(log)

    return res.status(200).json({ log: updatedLog })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

entriesRouter.patch("/:id", async (req, res) => {
  const { id } = req.params
  const { body } = req
  const formInput = cleanUserInput(body)
  const { quantity } = formInput

  try {
    const logEntry = await LogEntry.query().findById(id)
    const log = await logEntry.$relatedQuery("log")
    await LogEntry.query().patchAndFetchById(id, { quantity })
    const updatedLog = await LogSerializer.getDetail(log)
    
    return res.status(200).json({ log: updatedLog })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default entriesRouter