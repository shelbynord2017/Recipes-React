import React, { useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import search_icon from '../../assets/search.png'
import restaurant__banner from '../../assets/restaurant__banner.jpg'
import Recipes from '../Recipes/Recipes'

const Home = ({ onSearch, setSearchTerm }) => {



  return (
<div className="home">
    <Navbar />
    <div className="home__text">
      <div className="home__banner"></div>
      <h1 className="home__title">Welcome to Recipes from Around the World</h1>
    </div>
    <div className="home__description">
      <h2 className="home__subtitle">Discover delicious recipes from every corner of the globe!</h2>
      <p className="home__para">Explore a world of flavors and culinary traditions in all of your favorite categories. 
        There is a dish for everyone at every level! Search from our collections that include step-by-step instructions and nutritional information.
      </p>
    </div>
    
    <div className="search__bar--wrapper">
      <div className="search__bar">
        <input 
          type="text" 
          placeholder="Search for a recipe..." 
          className="search__input"
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
          onKeyDown={(e)=> e.key === "Enter" && onSearch(searchTerm)}
        />
        <img src={search_icon} alt="Search Icon" className="search__icon"/>
      </div>
    </div>

    <div className="home__categories">
      <ul>
        <li>Soups</li>
        <li>Salads</li>
        <li>Pasta</li>
        <li>Chicken</li>
      </ul>
    </div>
</div>



  )
}

export default Home