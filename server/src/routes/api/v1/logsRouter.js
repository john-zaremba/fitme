import express from "express"
import { Log } from "../../../models/index.js"
import LogSerializer from "../../../serializers/LogSerializer.js"
import User from "../../../models/User.js"
import logEntriesRouter from "./logEntriesRouter.js"

const logsRouter = new express.Router()

logsRouter.use("/:logId/entries", logEntriesRouter)

logsRouter.get("/", async (req, res) => {
  const userId = req.user.id

  try {
    const user = await User.query().findById(userId)
    const userLogs = await user.$relatedQuery("logs")
    const serializedUserLogs = await Promise.all(
      userLogs.map(async (log) => {
        return await LogSerializer.getSummary(log)
      })
    )
    return res.status(200).json({ logs: serializedUserLogs }) 
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

logsRouter.get("/:id", async (req, res) => {
  const userId = req.user.id
  const { id } = req.params

  try {
    const log = await Log.query().findById(id)
    if (userId === log.userId) {
      const serializedLog = await LogSerializer.getDetail(log)
      return res.status(200).json({ log: serializedLog })
    } else {
      return res.status(401).json({ errors: "UNAUTHORIZED REQUEST" })
    }
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})


export default logsRouter