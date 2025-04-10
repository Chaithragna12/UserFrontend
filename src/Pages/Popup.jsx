import React, { useState, useEffect } from 'react';
import './Popup.css'; // Import your CSS file for styling
const Popup = ({ message, type, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Auto close popup after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`popup-container ${isOpen ? 'active' : ''}`}>
      <div className={`popup-box ${type}`}>
        <div className="popup-content">
          <p>{message}</p>
        </div>
        <button className="popup-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Popup;