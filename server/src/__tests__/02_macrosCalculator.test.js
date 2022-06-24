import getMacros from "../services/getMacros.js"

describe("#getMacros", () => {
  let fatIntake, proteinIntake, carbsIntake
  let fatCal, proteinCal, carbsCal, totalCal
  let macros
 
  beforeEach(() => {
    fatIntake = 52
    proteinIntake = 170
    carbsIntake = 200
    fatCal = fatIntake * 9
    carbsCal = carbsIntake * 4
    proteinCal = proteinIntake * 4
    totalCal = fatCal + proteinCal + carbsCal
    macros = getMacros(fatIntake, proteinIntake, carbsIntake)
  })

  it("calculates the percentage of total calories that calories from fat intake contributes to", () => {
    expect(macros.fat).toEqual(Math.round((fatCal / totalCal) * 100))
  })

  it("calculates the percentage of total calories that calories from protein intake contributes to", () => {
    expect(macros.protein).toEqual(Math.round((proteinCal / totalCal) * 100))
  })

  it("calculates the percentage of total calories that calories from carbs intake contributes to", () => {
    expect(macros.carbs).toEqual(Math.round((carbsCal / totalCal) * 100))
  })

  it("macro percentages accurately represent 100 percent of daily calories", () => {
    expect(macros.fat + macros.protein + macros.carbs).toEqual(100)
  })
})