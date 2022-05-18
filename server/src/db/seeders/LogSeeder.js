import { Log, Consumable, User } from "../../models/index.js"

class LogSeeder {
  static async seed() {
    const hello = await User.query().findOne({ email: "hello@email.com" })
    const currentDate = new Date()
    const dateString = currentDate.toLocaleDateString()

    const logsData = [
      {
        userId: hello.id,
        date: dateString
      }
    ]

    const consumablesData = [
      {
         name: "banana",
         quantity: 1,
         calories: 105,
         fat: 0,
         protein: 1,
         carbs: 27 
      },
      {
         name: "chicken breast",
         quantity: 1,
         calories: 198,
         fat: 4,
         protein: 37,
         carbs: 0
      },
      {
         name: "vanilla ice cream",
         quantity: 1,
         calories: 273,
         fat: 19,
         protein: 42,
         carbs: 31 
      },
      {
         name: "greek yogurt",
         quantity: 1,
         calories: 100,
         fat: 19,
         protein: 59,
         carbs: 37 
      }
    ]

    for (const logObject of logsData) {
      const currentLog = await Log.query().findOne({
        userId: logObject.userId,
        date: logObject.date
      })
      if (!currentLog) {
        const log = await Log.query().insert(logObject)

        for (const consumableObject of consumablesData) {
          const currentConsumable = await Consumable.query().findOne({ name: consumableObject.name })
          if (!currentConsumable) {
            await log.$relatedQuery("consumables").insert(consumableObject)
          }
        }
      }
    }
  }
}

export default LogSeeder