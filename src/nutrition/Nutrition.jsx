import React from 'react';
import './Nutrition.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Nutrition = ({ nutrition }) => {
  if (!nutrition) {
    return null;
  }


  return (
    <>
    <Navbar/>
    <div className='nutrition__wrapper'>
      <h4 className='nutrition__title'>Nutrition Facts</h4>
        {nutrition.map((item, index) => (
          <li className="nutrition__ingredient--row" key={index}>
            {item.name}: {item.calories.toLocaleString()} cal | 
            Saturated Fat: {item.fat_saturated_g.toLocaleString()}g | 
            Fat: {item.fat_total_g.toLocaleString()}g | 
            Sodium: {item.sodium_mg.toLocaleString()}mg | 
            Cholesterol: {item.cholesterol_mg.toLocaleString()}mg | 
            Fiber: {item.fiber_g.toLocaleString()}g | 
            Carbohydrates: {item.carbohydrates_total_g.toLocaleString()}g | 
            Protein: {item.protein_g.toLocaleString()}g 
          </li>
        ))}
    </div>
    <Footer/>
    </>
  );
};

export default Nutrition;
