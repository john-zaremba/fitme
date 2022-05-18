import { Log, Consumable, User } from "../../models/index.js"

class LogSeeder {
  static async seed() {
    const hello = await User.query().findOne({ email: "hello@email.com" })

    const logsData = [
      {
        userId: hello.id,
        date: "1/10/21"
      },
      {
        userId: hello.id,
        date: "2/10/21"
      },
      {
        userId: hello.id,
        date: "5/10/21"
      },
      {
        userId: hello.id,
        date: "7/10/21"
      },
      {
        userId: hello.id,
        date: "2/12/22"
      },
      {
        userId: hello.id,
        date: "3/10/22"
      },
      {
        userId: hello.id,
        date: "4/12/22"
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
          const currentConsumable = await log
            .$relatedQuery("consumables")
            .where("name", "=", `${consumableObject.name}`)
          if (currentConsumable.length === 0) {
            await log.$relatedQuery("consumables").insert(consumableObject)
          }  
        }
      }
    }
  }
}

export default LogSeeder