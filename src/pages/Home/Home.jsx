import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import search_icon from '../../assets/search.png'
import restaurant__banner from '../../assets/restaurant__banner.jpg'
import Recipes from '../Recipes/Recipes'
import Footer from '../../components/Footer/Footer'

const Home = ({ onSearch, setSearchTerm, searchTerm, fetchByCategory }) => {
  const handleSearchClick = () => {
    sessionStorage.setItem("lastSearch", searchTerm);
    onSearch(searchTerm);
  };


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    if (query) {
        setSearchTerm(query);
    }
  }, []);
 

  return (
    <div className="home">
        <Navbar />
        <div className="home__text">
          <div className="home__banner"></div>
          <h1 className="home__title">Welcome to Recipes from Around the World</h1>
        </div>
        <div className="home__description">
          <h2 className="home__subtitle">Discover delicious recipes from every corner of the globe!</h2>
          <p className="home__para">Explore a world of flavors and culinary traditions in all of your <span className='text__color'>favorite categories</span>. 
            There is a dish for everyone at every level! Search from our collections that include <span className='text__color'>step-by-step instructions</span> and <span className='text__color'>nutritional information</span>.
          </p>
        </div>
        
        <div className="search__bar--wrapper">
          <div className="search__bar">
            <input 
              type="text" 
              placeholder="Search for a recipe." 
              className="search__input"
              value={searchTerm}
              onChange={(e)=> setSearchTerm(e.target.value)}
              onKeyDown={(e)=> e.key === "Enter" && onSearch(searchTerm)}
            />
            <img 
              src={search_icon} 
              alt="Search Icon" 
              className="search__icon"
              onClick={handleSearchClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        <div className="home__categories">
          <ul>
            <li onClick={()=> fetchByCategory("Seafood")}>Seafood</li>
            <li onClick={()=> fetchByCategory("Dessert")}>Dessert</li>
            <li onClick={()=> fetchByCategory("Starter")}>Starter</li>
            <li onClick={()=> fetchByCategory("Chicken")}>Chicken</li>
          </ul>
        </div>
        <Footer/>
    </div>
  );
};

export default Home