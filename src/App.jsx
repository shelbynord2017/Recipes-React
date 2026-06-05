import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Recipes from './pages/Recipes/Recipes';
import Nutrition from './nutrition/Nutrition';
import axios from 'axios';

function App() {

  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [nutrition, setNutrition] = useState(null);
  let navigate = useNavigate();

  
  const fetchMeals = async (searchQuery) => {
    try {
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`,
      );
      setMeals(data.meals || []);
      console.log(data.meals)
    } catch (error) {
      console.error("Error fetching meals:", error);
      setMeals([]);
    }
  };

  const onSearch = () => {
    setSelectedCategory("")
    fetchMeals(searchTerm);
    navigate("/recipes");
  };

  const fetchByCategory = async (category)=> {
    setSelectedCategory(category)
    try {
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );

      const categoryMeals = data.meals || [];

      const fullMeals = await Promise.all(
        categoryMeals.map(async (meal) => {
          console.log("meal id:", meal.idMeal)
          const { data } = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
          );

          return data.meals[0];
        })
      );
      console.log("category results:", fullMeals)
      setMeals(fullMeals);
      console.log(category)
      navigate("/recipes")
    } catch (error) {
      console.error("Error fetching meals:", error);
      setMeals([]);
    }
  }



  return (
    <div className="App">
        <Routes>
          <Route path="/" element={
            <Home 
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              onSearch={onSearch}
              fetchByCategory={fetchByCategory}
            />} 
          />
          <Route path="/recipes" element={
            <Recipes 
              meals={meals} 
              setNutrition={setNutrition}
              fetchMeals={fetchMeals}  
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
              />} 
            />
          <Route path="/nutrition" element={
            <Nutrition nutrition={nutrition} />} 
          />
        </Routes>

    </div>
  )
}

export default App;
