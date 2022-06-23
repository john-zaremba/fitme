import getBMR from "../services/getBMR.js"

describe("#getBMR", () => {
  let p1
  let p2
  let bmr1

  beforeEach(() => {
    p1 = {
      sex: "Female",
      height: 63,
      weight: 120,
      age: 27,
      activity: "2"
    }
    p2 = {
      ...p1,
      sex: "Male"
    }
    bmr1 = getBMR(
      p1.sex,
      p1.height, 
      p1.weight, 
      p1.age, 
      p1.activity 
    )
  })

  it("calculates a person's BMR based on their provided data", () => {
    expect(bmr1).toEqual(
      Math.round(
        Math.round((1.2 + (Number(p1.activity) - 1) * .175) * 1000) / 1000 * (
          655 + (9.6 * p1.weight) + (1.8 * p1.height) - (4.7 * p1.age)
        )
      )
    )
  })

  it("accommodates BMR differences of different sexes when all other data is the same", () => {
    const bmr2 = getBMR(
      p2.sex,
      p2.height, 
      p2.weight, 
      p2.age, 
      p2.activity 
    )

    expect(bmr1).toBeLessThan(bmr2)
  })

  it("accommodates BMR differences based on a person's activity level", () => {
    p2 = {
      ...p1,
      activity: "4"
    }
    const bmr2 = getBMR(
      p2.sex,
      p2.height, 
      p2.weight, 
      p2.age, 
      p2.activity 
    )

    expect(bmr1).toBeLessThan(bmr2)
  })
})