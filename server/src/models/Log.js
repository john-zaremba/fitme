const LogEntry = require("./LogEntry.js")
const Consumable = require("./Consumable.js")
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
      required: ["date", "userId"],
      properties: {
        date: { type: "string" },
        userId: { type: ["integer", "string"] }
      }
    }
  }

  async  getTotalCalories() {
    let sum = 0
    const relatedConsumables = await this.$relatedQuery("consumables")
    const caloriesArray = await Promise.all(
      relatedConsumables.map(async (consumable) => {
        const entry = await LogEntry.query().findOne({ 
          logId: this.id, 
          consumableId: consumable.id 
        })

        return consumable.calories * entry.quantity
      })
    )
    for (const calories of caloriesArray) {
      sum += calories
    }
   
    return sum
  }

  async addEntry(consumableData) {
    const existingConsumable = await Consumable.query().findOne({ 
      name: consumableData.name,
      unit: consumableData.unit 
    })
    
    if (!existingConsumable) {
      const dynamicAttributes = ["calories", "fat", "protein", "carbs"]
      const standardizedData = { 
        name: consumableData.name,
        unit: consumableData.unit 
      }
  
      for (const attribute of dynamicAttributes) {
        standardizedData[attribute] = Math.round(consumableData[attribute] / consumableData.quantity)
      }

      const consumable = await Consumable.query().insertAndFetch(standardizedData)
      const newEntry = await LogEntry.query().insert({
        logId: this.id,
        consumableId: consumable.id,
        quantity: consumableData.quantity
      })

      return {
        consumable,
        newEntry
      }
    } else {
      const newEntry = await LogEntry.query().insert({
        logId: this.id,
        consumableId: existingConsumable.id,
        quantity: consumableData.quantity
      })

      return {
        consumable: existingConsumable,
        newEntry
      }
    }
  }
}

module.exports = Log