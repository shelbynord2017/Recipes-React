import React from 'react'
import './Navbar.css'
import recipes_icon from '../../assets/recipes_icon.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

const navigate = useNavigate()

  return (
    <div>
      <div className="nav__container">
        <div className="row nav__row">
            <figure className="logo__wrapper">
              <img src={recipes_icon} alt="Logo" className="nav__logo--img"/>
            </figure>
            <div className="nav__links">
              <a onClick={() => navigate('/')} className="nav__link">Home</a>
              <a onClick={() => navigate('/recipes')} href="/recipes" className="nav__link">Recipes</a>
              <a href="#" className="nav__link">Contact</a>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar