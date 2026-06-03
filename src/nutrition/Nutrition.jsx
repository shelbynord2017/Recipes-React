import React from 'react';
import './Nutrition.css';

const Nutrition = ({ nutrition }) => {
  if (!nutrition) {
    return null;
  }

  return (
    <div>
      <h4>Nutrition Facts</h4>
        {nutrition.map((item, index) => (
          <li key={index}>
            {item.name}: {item.calories} cal | Protein: {item.protein_g}g | Fat: {item.fat_total_g}g
          </li>
        ))}
    </div>
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