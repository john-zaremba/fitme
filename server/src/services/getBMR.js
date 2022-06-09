const getBMR = (sex, height, weight, age, activity) => {
  let BMR
  let activityMultiplier

  switch (activity) {
    case "1":
      activityMultiplier = 1.2
      break
    case "2":
      activityMultiplier = 1.375
      break
    case "3":
      activityMultiplier = 1.55
      break
    case "4":
      activityMultiplier = 1.725
      break
    case "5":
      activityMultiplier = 1.9
      break
  }

  if (sex === "male") {
    BMR = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
    return Math.round(BMR * activityMultiplier)
  } else if (sex === "female") {
    BMR = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
    return Math.round(BMR * activityMultiplier)
  }
}

export default getBMR