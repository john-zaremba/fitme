import ConsumableSerializer from "./ConsumableSerializer.js"
import { LogEntry } from "../models/index.js"

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
      let serializedLog = {}
  
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
         
          return serializedConsumable
        })
      )
      serializedLog.entries = serializedConsumables
      
      return serializedLog
    } catch (error) {
      throw error
    }
  }
}

export default LogSerializer