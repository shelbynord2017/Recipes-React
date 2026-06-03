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
    <div className="btns">
      <button id="prevBtn" onClick={() => {}}>Previous</button>
      <button id="nextBtn" onClick={() => {}}>Next</button>
    </div>
</div>



  )
}

export default Home