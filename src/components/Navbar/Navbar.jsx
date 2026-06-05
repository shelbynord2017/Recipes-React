import React from 'react'
import './Navbar.css'
import recipes_icon from '../../assets/recipes_icon.png'

const Navbar = () => {
  return (
    <div>
      <div className="nav__container">
        <div className="row nav__row">
            <figure className="logo__wrapper">
              <img src={recipes_icon} alt="Logo" className="nav__logo--img"/>
            </figure>
            <div className="nav__links">
              <a href="/" className="nav__link">Home</a>
              <a href="/recipes" className="nav__link">Recipes</a>
              <a href="#" className="nav__link">Contact</a>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar