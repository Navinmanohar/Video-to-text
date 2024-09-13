import React from 'react'
import "./footer.css"
function footer() {
  return (
    <div>
        <footer class="footer">
    <h3>D e t a i l s</h3>
    <div class="links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
    </div>
    <div class="social-media">
        <a href="https://facebook.com" target="_blank" aria-label="Facebook">F</a>
        <a href="https://twitter.com" target="_blank" aria-label="Twitter">T</a>
        <a href="https://instagram.com" target="_blank" aria-label="Instagram">I</a>
        <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">L</a>
    </div>
    <div class="contact-info">
        <p>Contact us: info@example.com</p>
        <p>Phone: (123) 456-7890</p>
    </div>
</footer></div>
  )
}

export default footer