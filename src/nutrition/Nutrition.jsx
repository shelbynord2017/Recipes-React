import React from 'react'
import './Nutrition.css'
import axios from 'axios'
import { useState } from 'react'


const Nutrition = () => {

  const [nutritionData, setNutritionData] = useState([]);

async function sendData(meal) {
  const response = await axios.post(
  `https://api.edamam.com/api/nutrition-details?app_id=${process.env.REACT_APP_EDAMAM_ID}&app_key=${process.env.REACT_APP_EDAMAM_KEY}`,
  {
    ingr: Array.from({length: 20}, (_, i) => i + 1)
      .filter(i => meal[`strIngredient${i}`]?.trim())
      .map(i => `${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`)
  }
  setNutritionData(response.data)

);
}




  return (
  //   .map( => (
    <div>nutrition</div>
  // )
  )
}

export default Nutrition