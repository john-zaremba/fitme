import React, { useState } from "react"
import { Chart } from "react-google-charts"

const CalorieChart = (props) => {
  const { bmr } = props.user
  let { calories } = props.total
  calories ? calories : calories = 0
  let pieData
  let pieOptions

  if (bmr - calories >= 0) {
    pieData = [
      ["Calories", "Percent of BMR"],
      ["Consumed", parseInt(calories)],
      ["Remaining", parseInt(bmr - calories)]
    ]
    pieOptions = {
      chartArea: {width: 300, height: 300},
      colors: ["#4cb17f", "#37412a"],
      pieHole: 0.2,
      is3D: false
    }
  } else {
    pieData = [
      ["Calories", "Percent of BMR"],
      ["Target", parseInt(bmr)],
      ["Surplus", parseInt(calories - bmr)]
    ]
    pieOptions = {
      chartArea: {width: 300, height: 300},
      colors: ["#37412a", "#d9584a"],
      pieHole: 0.2,
      is3D: false
    }
  }

  return (
    <div className="form">
      <h5>
        Calories: {calories.toLocaleString("en-US")} / {bmr.toLocaleString("en-US")}
      </h5>
      <Chart 
        chartType="PieChart"
        width="100%"
        height="200px"
        data={pieData}
        options={pieOptions}
      />
    </div>
  )
}

export default CalorieChart