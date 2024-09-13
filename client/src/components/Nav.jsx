import React from 'react'
import icon from "../assets/icon.png"
import "./nav.css"
function Nav() {
  return (
    <div> 
        <nav class="navbar">
      <div class="navbar-brand">
        <img src={icon} alt="Icon" class="navbar-icon"/>
     </div>
     <ul class="navbar-menu">
        <li><a href="#">Home</a></li>
     </ul>
</nav>
</div>
  )
}

export default Nav