import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Recipes from './pages/Recipes/Recipes';
import Nutrition from './nutrition/Nutrition';
import { useNavigate } from 'react-router-dom';

function App() {

  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nutrition, setNutrition] = useState(null);
  let navigate = useNavigate();

  
  async function fetchMeals(searchTerm) {
      const { data } = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
          setMeals(data.meals);
    }  
  
  function onSearch() {
      fetchMeals(searchTerm);
      navigate('/recipes');
    }



  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home onSearch={onSearch}/>} />
          <Route path="/recipes" element={<Recipes meals={meals} setNutrition={setNutrition} />} />
          <Route path="/nutrition" element={<Nutrition nutrition={nutrition} />} />
        </Routes>

    </div>
  )
}

export default App
