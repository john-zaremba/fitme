class ConsumableSerializer {
  static getSummary(consumable) {
    let serializedConsumable = {}
    const allowedAttributes = [
      "id",
      "name",
      "quantity",
      "calories",
      "fat",
      "protein",
      "carbs"
    ]

    for (const attribute of allowedAttributes) {
      serializedConsumable[attribute] = consumable[attribute]
    }

    return serializedConsumable
  }
}

export default ConsumableSerializer