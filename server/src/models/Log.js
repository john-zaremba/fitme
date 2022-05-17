const Model = require("./Model.js")

class Log extends Model {
  static get tableName() {
    return "logs"
  }

  static get relationMappings() {
    const { User, Consumable, LogEntry } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "logs.userId",
          to: "users.id"
        }
      },
      logEntries: {
        relation: Model.HasManyRelation,
        modelClass: LogEntry,
        join: {
          from: "logs.id",
          to: "logEntries.logId"
        }
      },
      consumables: {
        relation: Model.ManyToManyRelation,
        modelClass: Consumable,
        join: {
          from: "logs.id",
          through: {
            from: "logEntries.logId",
            to: "logEntries.consumableId"
          },
          to: "consumables.id"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["key", "date","userId"],
      properties: {
        Key: { type: "string" },
        date: { type: ["object", "string"] },
        userId: { type: ["integer", "string"] }
      }
    }
  }
}

module.exports = Log