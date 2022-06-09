import getBMR from "./getBMR.js"

const ConvertUserInput= (userInput) => {
  const {
    age,
    feet,
    inches,
    weight,
    activityLevel,
    sex
  } = userInput
  const heightIn = (Number(feet) * 12) + Number(inches)
  const heightCm = Math.round(2.54 * heightIn)
  const weightKg = Math.round(Number(weight) / 2.205)
  const bmr = getBMR(sex, heightCm, weightKg, Number(age), activityLevel)
  const userInfo = {
    age,
    height: heightIn,
    weight,
    activityLevel,
    sex,
    bmr
  }
    
  return userInfo
}

export default ConvertUserInput