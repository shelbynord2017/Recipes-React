import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
  return (
<div className="home">
    <Navbar />
    <h1 className="title">Recipes</h1>
    <div className="recipe__wrapper">
      <ul className="ingredients"></ul>
    </div>
    <div class="btns">
      <button id="prevBtn" onclick="">Previous</button>
      <button id="nextBtn" onclick="">Next</button>
    </div>
</div>



  )
}

export default Home