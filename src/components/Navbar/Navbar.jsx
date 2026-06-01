import React from 'react'
import './Navbar.css'
import fork_icon from '../../assets/fork_icon.png'

const Navbar = () => {
  return (
    <div>
            <div class="nav__container">
              <div class="row nav__row">
                  <figure class="logo__wrapper">
                    <img src={fork_icon} alt="Logo" class="nav__logo--img"/>
                  </figure>
                  <div class="nav__links">
                    <a href="#" class="nav__link">Recipes</a>
                    <a href="#" class="nav__link">About</a>
                    <a href="#" class="nav__link">Contact</a>
                  </div>
              </div>
            </div>
    </div>
  )
}

export default Navbar