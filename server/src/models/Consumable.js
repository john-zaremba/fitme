const Model = require("./Model.js")

class Consumable extends Model {
  static get tableName() {
    return "consumables"
  }

  static get relationMappings() {
    const { Log, LogEntry } = require("./index.js")

    return {
      logEntries: {
        relation: Model.HasManyRelation,
        modelClass: LogEntry,
        join: {
          from: "consumables.id",
          to: "longEntries.consumablesId"
        }
      },
      logs: {
        relation: Model.ManyToManyRelation,
        modelClass: Log,
        join: {
          from: "consumables.id",
          through: {
            from: "logEntries.consumableId",
            to: "longEntries.logId"
          },
          to: "logs.id"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "name",
        "calories",
        "fat",
        "protein",
        "carbs"
      ],
      properties: {
        name: { type: "string" },
        calories: { type: ["integer", "string"] },
        fat: { type: ["integer", "string"] },
        protein: { type: ["integer", "string"] },
        carbs: { type: ["integer", "string"] }
      }
    }
  }
}

module.exports = Consumable