const getBMR = (sex, height, weight, age, activity) => {
  let BMR
  const activityMultiplier = Math.round(
    (1.2 + (Number(activity) - 1) * .175) * 1000
  ) / 1000

  if (sex === "Male") {
    BMR = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
    return Math.round(BMR * activityMultiplier)
  } else if (sex === "Female") {
    BMR = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
    return Math.round(BMR * activityMultiplier)
  }
}

export default getBMR