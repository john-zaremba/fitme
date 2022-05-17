import ConsumableSerializer from "./ConsumableSerializer.js"

class LogSerializer {
  static async getDetail(log) {
    try {
      const allowedAttributes = ["id", "key", "userId", "date"]
      let serializedLog = {}
  
      for (const attribute of allowedAttributes) {
        serializedLog[attribute] = log[attribute]
      }
      const relatedConsumables = await log.$relatedQuery("consumables")
      const serializedConsumables = await Promise.all(
        relatedConsumables.map(async (consumable) => {
          return ConsumableSerializer.getSummary(consumable)
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