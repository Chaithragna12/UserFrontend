import React from 'react';
import './homepage.css';
import HeroImage from '../../assets/home.png';

const Homepage = () => {
  return (
    <div id="home" className="homepage-container">
      {/* Hero Section */}
      <div className="hero-section">
        {/* Hero Content (Left) */}
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="highlight">Akshaya...</span>
          </h1>
      
          <p className="description">
            Welcome to <strong><i>Akshaya Restaurant</i></strong>, where every meal is a celebration of flavors, tradition, and hospitality. 
            We blend authentic recipes with a modern touch, 
            using fresh, handpicked ingredients to create unforgettable dishes. 
            Our chefs craft a variety of flavorful delights, from sizzling appetizers to rich, 
            satisfying main courses. Step into our warm and elegant ambiance, perfect for family gatherings, 
            romantic dinners, or casual meetups. Experience great taste, impeccable service, 
            and cherished moments at Akshaya Restaurant! 🍽✨
          </p>

          <h5 className="hero-description">
            <i><b>"Delight your taste buds with authentic flavors, fresh ingredients, and a warm dining experience."</b></i>
          </h5>

          {/* Explore Menu Button */}
          <a href="#Menu" className="cta-button">Explore Menu to order</a>
        </div>

        {/* Hero Image (Right) */}
        <div className="hero-image-container">
          <img src={HeroImage} alt="Delicious Dish" className="hero-image" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
