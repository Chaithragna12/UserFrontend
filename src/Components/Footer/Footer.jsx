import React from "react";
import { 
  FaFacebook, FaInstagram, FaLinkedin, 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt 
} from 'react-icons/fa';
import "./footer.css";

const MapSection = () => {
  return (
    <div className="map-section-container">
      {/* 📍 Google Maps Embed */}
      <div className="google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4808.233468894335!2d78.50713216163193!3d13.56488019298637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2667079e76515%3A0x753717a88793094b!2sAkshaya%20Family%20Garden%20Restaurant!5e0!3m2!1sen!2sin!4v1740808818031!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0, width: "100%", marginTop: "20px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* 📍 Contact Details */}
      <div className="details-row">
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
            <p>Akshaya Family Garden Restaurant, Madanapalle</p>
          </div>
        </div>

        <div className="details-box">
          <h2 className="details-title">Opening Hours</h2>
          <p>Every day: 12pm - 10pm</p>
          <p>Sunday: 10am - 10pm</p>
        </div>

        <div className="details-box">
          <h2 className="details-title">Quick Links</h2>
          <ul className="quick-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#Menu">Menu</a></li>
            <li><a href="#About">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* 🌐 Social Media Links */}
      <div className="social-links">
        <a href="https://www.facebook.com/profile.php?id=61561544652969" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://www.instagram.com/webplusacademy?igsh=ZGVtaXFrcjNjcGN0" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://www.linkedin.com/in/saran-velmurugan-357499238" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      </div>
    </div>
  );
};

export default MapSection;
