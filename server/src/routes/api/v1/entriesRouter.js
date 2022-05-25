import express from "express"
import objection from "objection"
import { LogEntry } from "../../../models/index.js"
import ConsumableSerializer from "../../../serializers/ConsumableSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
const { ValidationError } = objection

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

entriesRouter.patch("/:id", async (req, res) => {
  const { id } = req.params
  const { body } = req
  const formInput = cleanUserInput(body)
  const { quantity } = formInput

  try {
    const patchedEntry = await LogEntry.query().patchAndFetchById(id, { quantity })
    const relatedConsumable = await patchedEntry.$relatedQuery("consumable")
    const serializedConsumable = ConsumableSerializer.getSummary(relatedConsumable, patchedEntry.quantity, patchedEntry.id)
    
    return res.status(200).json({ entry: serializedConsumable })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default entriesRouter