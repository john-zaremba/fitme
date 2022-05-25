class ConsumableSerializer {
  static getSummary(consumable, quantity, entryId) {
    let serializedConsumable = {}
    const allowedAttributes = [
      "id",
      "name",
      "unit",
      "calories",
      "fat",
      "protein",
      "carbs"
    ]

    let index = 0
    for (const attribute of allowedAttributes) {
      if (index > 2) {
        serializedConsumable[attribute] = consumable[attribute] * quantity
      } else {
        serializedConsumable[attribute] = consumable[attribute]
      }
      index++
    }

    serializedConsumable.quantity = quantity
    serializedConsumable.entryId = entryId

    return serializedConsumable
  }
}

export default ConsumableSerializer