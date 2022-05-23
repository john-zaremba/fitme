import express from "express"
import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import logsRouter from "./api/v1/logsRouter.js"
import entriesRouter from "./api/v1/entriesRouter.js"
const rootRouter = new express.Router()

rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/logs", logsRouter)
rootRouter.use("/api/v1/entries", entriesRouter)

rootRouter.use("/", clientRouter)

export default rootRouter