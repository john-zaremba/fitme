const getMacros = (fat, protein, carbs) => {
  const fatCal = fat * 9
  const proteinCal = protein * 4
  const carbsCal = carbs * 4
  const total = fatCal + proteinCal + carbsCal
  
  const macros = {
    fat: Math.round((fatCal / total) * 100),
    protein: Math.round((proteinCal / total) * 100),
    carbs: Math.round((carbsCal / total) * 100)
  }

  return macros
}

export default getMacros