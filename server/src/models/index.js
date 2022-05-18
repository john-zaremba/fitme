// include all of your models here using CommonJS requires
const User = require("./User.js")
const Consumable = require("./Consumable.js")
const Log = require("./Log.js")
const LogEntry = require("./LogEntry.js")

module.exports = { User, Consumable, Log, LogEntry }