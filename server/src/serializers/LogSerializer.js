import ConsumableSerializer from "./ConsumableSerializer.js"
import { LogEntry } from "../models/index.js"
import getMacros from "../services/getMacros.js"

class LogSerializer {
  static async getSummary(log) {
    const allowedAttributes = ["id", "userId", "date"]
    let serializedLog = {}

    for (const attribute of allowedAttributes) {
      serializedLog[attribute] = log[attribute]
    }

    serializedLog.totalCalories = await log.getTotalCalories()
    
    return serializedLog
  }

  static async getDetail(log) {
    try {
      const allowedAttributes = ["id", "userId", "date"]
      const dynamicAttributes = ["calories", "fat", "protein", "carbs"]
      let serializedLog = {}
      let total = {
        calories: 0,
        fat: 0,
        protein: 0,
        carbs: 0
      }
  
      for (const attribute of allowedAttributes) {
        serializedLog[attribute] = log[attribute]
      }
      const relatedConsumables = await log.$relatedQuery("consumables")
      const serializedConsumables = await Promise.all(
        relatedConsumables.map(async (consumable) => {
          const logEntry = await LogEntry.query().findOne({ 
            logId: log.id, 
            consumableId: consumable.id 
          })
          const serializedConsumable = ConsumableSerializer.getSummary(consumable, logEntry.quantity, logEntry.id)

          for (const attribute of dynamicAttributes) {
            total[attribute] += serializedConsumable[attribute]
          }

          return serializedConsumable
        })
      )
      
      serializedLog.entries = serializedConsumables.sort((a, b) => {
        return b.entryId - a.entryId
      })
      serializedLog.total = total
      serializedLog.macros = getMacros(total.fat, total.protein, total.carbs)
      
      return serializedLog
    } catch (error) {
      throw error
    }
  }
}

export default LogSerializer