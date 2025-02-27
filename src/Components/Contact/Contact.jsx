import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './contact.css';

const ContactForm = () => {
  return (
    <div id="contact">
      <div className="contact-container">
        <h1 className="title">Contact Us</h1>
        <h2 className="subtitle">HOW TO GET IN TOUCH?</h2>

        {/* Two-column layout */}
        <div className="content-wrapper">
          {/* Left Side: Contact Information */}
          <div className="contact-info">
            <div className="info-section">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              <div>
                <h3>Address</h3>
                <p>
                  Anantapur - Tirupati Hwy, near Mits College, Kadiri, Anagallu,  
                  <br />
                  Andhra Pradesh 517326
                </p>
              </div>
            </div>

            <div className="info-section">
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <div>
                <h3>Phone</h3>
                <p>+91 83xxxxxxxx5</p>
              </div>
            </div>

            <div className="info-section">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <div>
                <h3>Email</h3>
                <p>akshaya@gmail.com</p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="social-links">
              <p>Follow Us</p>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" />
                </a>
                <a href="#" className="social-icon">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
                </a>
                <a href="#" className="social-icon">
                  <img src="https://cdn-icons-png.freepik.com/256/2504/2504839.png?semt=ais_hybrid" alt="Twitter" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="contact-form-container">
            <form className="contact-form">
              <h3>Send Us a Message</h3>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="text" placeholder="Subject" required />
              <textarea placeholder="Message" required></textarea>
              <button type="submit" className="book-table">BOOK A TABLE</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactForm;
