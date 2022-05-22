class ConsumableSerializer {
  static getSummary(consumable, quantity) {
    let serializedConsumable = {}
    const allowedAttributes = [
      "id",
      "name",
      "calories",
      "fat",
      "protein",
      "carbs"
    ]
    let index = 0
    for (const attribute of allowedAttributes) {
      if (index > 1) {
        serializedConsumable[attribute] = consumable[attribute] * quantity
      } else {
        serializedConsumable[attribute] = consumable[attribute]
      }
      index++
    }

    serializedConsumable.quantity = quantity

    return serializedConsumable
  }
}

export default ConsumableSerializer