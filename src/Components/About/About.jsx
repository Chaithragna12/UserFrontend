import React from "react";
import "./about.css";
import AboutImage from "../../assets/ambience.png";

const AboutUs = () => {
  return (
    <div id="About" className="about-container">
      <div className="about-content">
        <h1 className="about-title">ABOUT AKSHAYA RESTAURANT</h1>
        <div className="title-underline"></div>
        
        <div className="about-layout">
          <div className="image-container">
            <img 
              src={AboutImage} 
              alt="Akshaya Restaurant Ambience" 
              className="about-image"
              loading="lazy" // Added for performance
            />
          </div>
          
          <div className="text-content">
            <p className="quote">"Savor the taste of tradition with every bite"</p>
            <p className="description">
              Welcome to <strong>Akshaya Restaurant</strong>, where every meal is a celebration of flavors and heritage.
              We take pride in crafting dishes that blend authentic traditions with a modern touch.
            </p>
            <p className="description">
              Using fresh, locally sourced ingredients, our chefs create a variety of mouth-watering recipes
              that bring families and friends together. Whether you're here for a cozy dinner or a festive feast,
              we ensure every bite is unforgettable.
            </p>
            <p className="tagline">
              Join us at Akshaya Restaurant, where food meets passion, and every meal feels like home.
            </p>
            {/* <nav></nav> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;