import express from "express"
import { LogEntry } from "../../../models/index.js"

const entriesRouter = new express.Router()

entriesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    await LogEntry.query().deleteById(id)
    return res.status(200).json({ message: "Review successfully deleted"})
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default entriesRouter