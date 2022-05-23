class LogEntrySerializer {
  static getSummary(apiResponse) {
    const {
      food_name,
      serving_qty,
      serving_unit,
      nf_calories,
      nf_total_fat,
      nf_protein,
      nf_total_carbohydrate
    } = apiResponse.foods[0]

    const name = food_name.toString()
    const unit = serving_unit.toString()
    const quantity = serving_qty.toString()
    const calories = Math.round(nf_calories).toString()
    const fat = Math.round(nf_total_fat).toString()
    const protein = Math.round(nf_protein).toString()
    const carbs = Math.round(nf_total_carbohydrate).toString()

    const serializedLogEntry = {
      name,
      unit,
      quantity,
      calories,
      fat,
      protein,
      carbs
    }

    return serializedLogEntry
  }
}

export default LogEntrySerializer