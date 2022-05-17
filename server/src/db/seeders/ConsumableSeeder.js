import { Consumable } from "../../models/index.js"

class ConsumableSeeder {
  static async seed() {
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

    for (const consumableObject of consumablesData) {
      const currentConsumable = await Consumable.query().findOne({ name: consumableObject.name })
      if (!currentConsumable) {
        await Consumable.query().insert(consumableObject)
      }
    }
  }
}

export default ConsumableSeeder