import React from 'react'
import './Recipes.css'
import { useState, useEffect } from 'react'
import axios from 'axios'



const Recipes = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5
    const [meals, setMeals] = useState([]);


  async function fetchMeals(searchTerm) {
            const { data } = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
                setMeals(data.meals);
                console.log(data);
        }

    useEffect(() => {
        fetchMeals('chicken');
    },[])

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const paginatedData = meals.slice(start, end)


  return (
    <>
      {paginatedData.map(meal => (
      <div className="recipe__wrapper" key={meal.idMeal}>
          <h3 className="recipe__title">{meal.strMeal}</h3>
          <h5 className="recipe__origin">{meal.strArea}</h5>
          <div className="ingredients__wrapper">
            {Array.from({length: 20}, (_, i) => i + 1)
              .filter(i => meal[`strIngredient${i}`]?.trim())
              .map(i => (
                <li key={i}>{meal[`strIngredient${i}`]} - {meal[`strMeasure${i}`]}</li>
              ))}
          </div>
          <p className="recipe__instructions">{meal.strInstructions}</p>
          <figure className="meal__img--wrapper">
              <img src={meal.strMealThumb} className="meal__img"/>
          </figure>
          <button>View Nutrition</button>
      </div>
      ))}
      <button onClick={() => {setCurrentPage(prev => prev - 1); window.scrollTo(0, 0); }} disabled={currentPage === 1}>Prev</button>
      <button onClick={() => {setCurrentPage(prev => prev + 1); window.scrollTo(0, 0); }}>Next</button>
    </>
  )
}

export default Recipes