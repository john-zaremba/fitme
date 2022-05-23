import { Log, Consumable, LogEntry, User } from "../../models/index.js"

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
         unit: 'medium (7" to 7-7/8" long)',
         quantity: 1,
         calories: 105,
         fat: 0,
         protein: 1,
         carbs: 27 
      },
      {
         name: "chicken breast",
         unit: "breast",
         quantity: 2,
         calories: 198,
         fat: 4,
         protein: 37,
         carbs: 0
      },
      {
         name: "vanilla ice cream",
         unit: "cup",
         quantity: 1,
         calories: 273,
         fat: 19,
         protein: 42,
         carbs: 31 
      },
      {
         name: "greek yogurt",
         unit: "cup",
         quantity: 3,
         calories: 134,
         fat: 1,
         protein: 23,
         carbs: 8 
      },
      {
        name: "flour",
         quantity: 1,
         unit: "cup",
         calories: 100,
         fat: 19,
         protein: 59,
         carbs: 37 
      },
      {
        name: "flour",
        quantity: 1,
        unit: "tablespoon",
        calories: 28,
        fat: 0,
        protein: 1,
        carbs: 6 
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
          const currentConsumable = await Consumable.query().findOne({ 
            name: consumableObject.name,
            unit: consumableObject.unit 
          })
          if (!currentConsumable) {
            const newConsumable = await Consumable.query().insert({
              name: consumableObject.name,
              unit: consumableObject.unit,
              calories: consumableObject.calories,
              fat: consumableObject.fat,
              protein: consumableObject.protein,
              carbs: consumableObject.carbs
            })
            await LogEntry.query().insert({
              logId: log.id,
              consumableId: newConsumable.id,
              quantity: consumableObject.quantity
            })
          } else {
            await LogEntry.query().insert({
              logId: log.id,
              consumableId: currentConsumable.id,
              quantity: consumableObject.quantity
            })
          }
        }
      }
    }
  }
}

export default LogSeeder