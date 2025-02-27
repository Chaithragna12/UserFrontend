import React, { useState } from "react";
import Map from "../../assets/map.png"; // Adjust path if necessary
import Web_plus_academy_logo from "../../assets/WPAlogo.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPlus, FaMinus } from 'react-icons/fa';
import "./footer.css"; // Import the new CSS file

const MapSection = () => {
    const [zoomLevel, setZoomLevel] = useState(1); // Initial zoom level

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.2, 2)); // Max zoom: 2x
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 1)); // Min zoom: 1x (original size)
  };
  return (
    <div className="map-section-container">
      {/* 🌍 Centered Map */}
      <div className="map-container">
      <img 
   src={Map} 
   alt="Location map" 
   className="map-image" 
   style={{ transform: `scale(${zoomLevel})` }} 
/>

        <div className="zoom-controls">
          <button onClick={handleZoomIn} className="zoom-button"><FaPlus /></button>
          <button onClick={handleZoomOut} className="zoom-button"><FaMinus /></button>
        </div>
      </div>

      {/* 📍 About Us, Opening Hours, Quick Links in a Single Line */}
      <div className="details-row">
        {/* About Us */}
        <div className="details-box">
          <h2 className="details-title">About Us</h2>
          <div className="contact-item">
            <FaPhoneAlt className="icon" />
            <p>+91 83419 73665</p>
          </div>
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <p>akshaya@gmail.com</p>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="icon" />
            <p>Anantapur - Tirupati Hwy, Kadiri, Angallu, Chittoor - 517326</p>
          </div>
        </div>
        {/* Opening Hours */}
        <div className="details-box">
          <h2 className="details-title">Opening Hours</h2>
          <p>Every day: 12pm - 10pm</p>
          <p>Sunday: 10am - 10pm</p>
        </div>

        {/* Quick Links */}
        <div className="details-box">
          <h2 className="details-title">Quick Links</h2>
          <ul className="quick-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* 🌐 Social Media Icons */}
      <div className="social-links">
        <a href="https://www.facebook.com/profile.php?id=61561544652969" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://www.instagram.com/webplusacademy?igsh=ZGVtaXFrcjNjcGN0" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://www.linkedin.com/in/saran-velmurugan-357499238" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      </div>
{/* 📜 Footer */}




      {/* 🔥 Logo */}
      {/* <div className="logo-container">
        <img src={Web_plus_academy_logo} alt="Web Plus Academy Logo" />
      </div> */}
    </div>
  );
};
export default MapSection;