import React from 'react';
import './Nutrition.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Nutrition = ({ nutrition }) => {
  if (!nutrition) {
    return null;
  }

  const lastSearch = sessionStorage.getItem("lastSearch");

  return (
    <>
    <Navbar/>
    <button className="back__btn" onClick={() =>navigate('/')}>Back</button>
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



//  <p>Calories: {nutrition.calories}</p>
//       <h5>Total Nutrients</h5>
//       <ul>
//         {nutrition.totalNutrients && Object.values(nutrition.totalNutrients).map(nutrient => (
//           <li key={nutrient.label}>{nutrient.label}: {nutrient.quantity.toFixed(2)} {nutrient.unit}</li>
//         ))}
//       </ul>