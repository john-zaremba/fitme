const Model = require("./Model.js")

class LogEntry extends Model {
  static get tableName() {
    return "logEntries"
  }

  static get relationMappings() {
    const { Log, Consumable } = require("./index.js")
    
    return {
      log: {
        relation: Model.BelongsToOneRelation,
        modelClass: Log,
        join: {
          from: "logEntries.logId",
          to: "logs.id"
        }
      },
      consumable: {
        relation: Model.BelongsToOneRelation,
        modelClass: Consumable,
        join: {
          from: "logEntries.consumableId",
          to: "consumables.id"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["logId", "consumableId"],
      properties: {
        logId: { type: ["integer", "string"] },
        consumableId: { type: ["integer", "string"] }
      }
    }
  }
}

module.exports = LogEntry