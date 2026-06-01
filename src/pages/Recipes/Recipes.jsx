import React from 'react'
import './Recipes.css'
import { useState, useEffect } from 'react'
import axios from 'axios'



const Recipes = () => {

    const [meals, setMeals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const mealsPerPage = 5;


  async function fetchMeals(searchTerm) {
            const { data } = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
                setMeals(data.meals);
                console.log(data);
        }

    useEffect(() => {
        fetchMeals('chicken');
    },[])



  return (
    <>
      {meals.map(meal => (
      <div className="recipe__wrapper" key={meal.idMeal}>
          <h3 className="recipe__title">{meal.strMeal}</h3>
          <h5 className="recipe__origin">{meal.strArea}</h5>
          <div className="ingredients__wrapper">
              {meal.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient} - {meal.measures[index]}
                </li>
              ))}
          </div>
          <p className="recipe__instructions">{meal.strInstructions}</p>
          <figure className="meal__img--wrapper">
              <img src={meal.strMealThumb} className="meal__img"/>
          </figure>
      </div>
      ))}
    </>
  )
}

export default Recipes