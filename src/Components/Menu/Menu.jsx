import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { biryani, starters, soups, tandoori, friedRice, mainCourse, beverages, iceCream } from '../../assets/assets';
import './menu.css';

const RestaurantMenu = () => {
  // Handle Full Menu Click
  const handleFullMenuClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate('/demo1'); // Navigate to full menu page
  };
  const navigate = useNavigate(); // Initialize useNavigate

  const menuItems = [
    { name: 'Biryani', image: biryani },
    { name: 'Starters', image: starters },
    { name: 'Soups', image: soups },
    { name: 'Tandoori Delights', image: tandoori },
    { name: 'Chinese Fried Rice', image: friedRice },
    { name: 'Main Course', image: mainCourse },
    { name: 'Beverages', image: beverages },
    { name: 'Ice Cream', image: iceCream }
  ];

  return (
    <div className="menu-container" id='Menu'>
      <div className="menu-wrapper">
        <div className="menu-title">
          <h1>Our Menu</h1>
        </div>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.name} className="menu-item">
              <img src={item.image} alt={item.name} />
              <div className="menu-item-name">
                <h2>{item.name}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="menu-button-container">
          <button className="menu-button" onClick={handleFullMenuClick}>
            View Full Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
