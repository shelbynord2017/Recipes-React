import React from 'react';
import './Nutrition.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Nutrition = ({ nutrition }) => {
  if (!nutrition) {
    return null;
  }

  const lastSearch = sessionStorage.getItem("lastSearch");
  const navigate = useNavigate();

  function goBack() {
    const lastSearch = sessionStorage.getItem("lastSearch");
    navigate(`/?query=${lastSearch}`);
  }

  return (
    <>
    <Navbar/>
    <button className="back__btn" onClick={() =>navigate(`/?query=${lastSearch}`)}>Back</button>
    <div className='nutrition__wrapper'>
      <h4 className='nutrition__title'>Nutrition Facts</h4>
        {nutrition.map((item, index) => (
          <li className="nutrition__ingredient--row" key={index}>
            {item.name}: {item.calories} cal | 
            Saturated Fat: {item.fat_saturated_g}g | 
            Fat: {item.fat_total_g}g | 
            Sodium: {item.sodium_mg}mg | 
            Cholesterol: {item.cholesterol_mg}mg | 
            Fiber: {item.fiber_g}g | 
            Carbohydrates: {item.carbohydrates_total_g}g | 
            Protein: {item.protein_g}g 
          </li>
        ))}
    </div>
    <Footer/>
    </>
  );
};

export default Nutrition;
