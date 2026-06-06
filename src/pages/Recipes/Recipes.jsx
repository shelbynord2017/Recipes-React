import './Recipes.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Nutrition from '../../nutrition/Nutrition';
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';


const Recipes = ({ meals, setNutrition, fetchMeals, selectedCategory }) => {
    const location = useLocation();
    const searchTerm = new URLSearchParams(location.search).get("search");
    const navigate = useNavigate();
    const appKey = import.meta.env.VITE_CALORIENINJA_KEY;

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5
    const [loading, setLoading] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [sortOrder, setSortOrder] = useState('')


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
    }, [searchTerm, selectedCategory, fetchMeals])

    const safeMeals = Array.isArray(meals) ? meals.map(meal=> ({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strArea: meal.strArea || "",
      strInstructions: meal.strInstructions || "",
    ...meal
    })) : [];

    const sortedMeals = [...safeMeals].sort((a,b) => {
    if (sortOrder === 'A_TO_Z') {
      return a.strMeal.localeCompare(b.strMeal);
    }
    if (sortOrder === 'Z_TO_A') {
      return b.strMeal.localeCompare(a.strMeal);
    }
    return 0;
  });

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const paginatedData = sortedMeals.slice(start, end) || [];
    const totalPages = Math.ceil((meals?.length || 0) / pageSize);


  return (
    <>
      <Navbar/>
      <div className='sorting'>
        <button className="back__btn" onClick={() =>navigate('/')}>Back</button>
        <select id="filter" defaultValue="DEFAULT" onChange={(event) => setSortOrder(event.target.value)} >
          <option className="filter__text" value="DEFAULT">Sort</option>
          <option className="filter__text" value="A_TO_Z">A to Z</option>
          <option className="filter__text" value="Z_TO_A">Z to A</option>
        </select>
      </div>
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
                  <li className="ingredients" key={i}>
                    {meal[`strIngredient${i}`]} - {meal[`strMeasure${i}`]}
                  </li>
                ))}
            </div>
            <p className="recipe__instructions">{meal.strInstructions}</p>
            <button
              className='nutrition__btn'
              onClick={() => fetchNutrition(meal)}
              disabled={loading && selectedMeal === meal.idMeal}
            >
              {loading && selectedMeal === meal.idMeal
                ? "Loading..."
                : "View Nutrition"}
            </button>
            <figure className="meal__img--wrapper">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal__img"
              />
            </figure>
          </div>
        ))
      )}
      {paginatedData.length > 0 && (
        <div className="pagination btns">
          <button
            className='prev__btn'
            onClick={() => {
              setCurrentPage((prev) => prev - 1);
              window.scrollTo(0, 0);
            }}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className='page__number'>
            Page {currentPage} of {totalPages}
          </span>
          <button
          className='next__btn'
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
    <Footer/>
    </>
  );
};

export default Recipes;