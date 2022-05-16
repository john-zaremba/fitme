const Model = require("./Model.js")

class Consumable extends Model {
  static get tableName() {
    return "consumables"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "name",
        "quantity",
        "calories",
        "fat",
        "protein",
        "carbs"
      ],
      properties: {
        name: { type: "string" },
        quantity: { type: ["integer", "string"] },
        calories: { type: ["integer", "string"] },
        fat: { type: ["integer", "string"] },
        protein: { type: ["integer", "string"] },
        carbs: { type: ["integer", "string"] }
      }
    }
  }
}

module.exports = Consumable