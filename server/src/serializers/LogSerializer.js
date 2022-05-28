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

      const relatedEntries = await log.$relatedQuery("logEntries")

      const serializedEntries = await Promise.all(
        relatedEntries.map(async (entry) => {
          const consumable = await entry.$relatedQuery("consumable")
          const serializedEntry = ConsumableSerializer.getSummary(consumable, entry.quantity, entry.id)

          for (const attribute of dynamicAttributes) {
            total[attribute] += serializedEntry[attribute]
          }
          
          return serializedEntry
        })
      )

      serializedLog.entries = serializedEntries.sort((a, b) => {
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