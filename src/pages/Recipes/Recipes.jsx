import './Recipes.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Nutrition from '../../nutrition/Nutrition';
import { useNavigate } from 'react-router-dom'


const Recipes = ({ meals, setNutrition, fetchMeals, searchTerm, selectedCategory }) => {
    const navigate = useNavigate();
    const appKey = import.meta.env.VITE_CALORIENINJA_KEY;

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5
    const [loading, setLoading] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);

const fetchNutrition = async (meal) => {
  try {
      setLoading(true);
      setSelectedMeal(meal.idMeal);
      const query = Array.from({ length: 20 }, (_, i) => i + 1)
        .filter((i) => meal[`strIngredient${i}`]?.trim())
        .map((i) => {
          const ingredient = meal[`strIngredient${i}`].trim();
          const measure = meal[`strMeasure${i}`]?.trim() || "";
          const cleanMeasure = measure
            .replace(
              /[¼½¾⅓⅔⅛]/g,
              (m) =>
                ({
                  "¼": "0.25",
                  "½": "0.5",
                  "¾": "0.75",
                  "⅓": "0.33",
                  "⅔": "0.67",
                  "⅛": "0.125",
                })[m],
            )
            .replace(/[^a-zA-Z0-9.\s]/g, "")
            .trim();
          return `${cleanMeasure} ${ingredient}`;
        })
        .join(", ");

              

  const response = await axios.get(
    "https://api.calorieninjas.com/v1/nutrition", 
    {
      params: { query },
      headers: { "X-Api-Key": appKey },
    }
  );

  setNutrition(response.data.items);
  navigate("/nutrition");
  } catch (error) {
    console.error("Nutrition API error:", error);
    alert("There was an issue loading the nutrition data.");
  } finally {
    setLoading(false);
  }
}

    useEffect(() => { 
      console.log("Recipes useEffect running", searchTerm, selectedCategory, meals.length)
      if (searchTerm) {
        fetchMeals(searchTerm);
      } else if (!selectedCategory && meals.length === 0) {
        fetchMeals("chicken");
      }
    }, [searchTerm, selectedCategory])

    const safeMeals = Array.isArray(meals) ? meals.map(meal=> ({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strArea: meal.strArea || "",
      strInstructions: meal.strInstructions || "",
    ...meal
    })) : [];

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const paginatedData = safeMeals?.slice(start, end) || [];
    const totalPages = Math.ceil((meals?.length || 0) / pageSize);


  return (
    <>
      {paginatedData.length === 0 ? (
        <p>No recipes found. Try searching for something else!</p>
      ) : (
        paginatedData.map((meal) => (
          <div className="recipe__wrapper" key={meal.idMeal}>
            <h3 className="recipe__title">{meal.strMeal}</h3>
            <h5 className="recipe__origin">{meal.strArea}</h5>
            <div className="ingredients__wrapper">
              {Array.from({ length: 20 }, (_, i) => i + 1)
                .filter((i) => meal[`strIngredient${i}`]?.trim())
                .map((i) => (
                  <li key={i}>
                    {meal[`strIngredient${i}`]} - {meal[`strMeasure${i}`]}
                  </li>
                ))}
            </div>
            <p className="recipe__instructions">{meal.strInstructions}</p>
            <figure className="meal__img--wrapper">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal__img"
              />
            </figure>
            <button
              onClick={() => fetchNutrition(meal)}
              disabled={loading && selectedMeal === meal.idMeal}
            >
              {loading && selectedMeal === meal.idMeal
                ? "Loading..."
                : "View Nutrition"}
            </button>
          </div>
        ))
      )}
      {paginatedData.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => {
              setCurrentPage((prev) => prev - 1);
              window.scrollTo(0, 0);
            }}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
              window.scrollTo(0, 0);
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Recipes;