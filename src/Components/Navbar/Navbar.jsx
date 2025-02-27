import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import logo from '../../assets/logo.png'; // Import your logo image

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('#home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={logo} alt="Restaurant Logo" />
        </div>

        {/* Navbar Buttons */}
        <div className="navbar-links">
          {['home', 'about', 'menu', 'reviews', 'contact'].map((section) => (
            <button
              key={section}
              className={`nav-button ${activeLink === `#${section}` ? 'active' : ''}`}
              onClick={() => window.location.href = `#${section}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
          <button className="nav-button" onClick={toggleProfile}>Profile</button>
        </div>
      </div>

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div ref={profileRef} className="profile-dropdown">
          {/* <a href="/login">Login</a> */}
          <a href="/signup">Signup</a>
          <a href="/logout" className="logout">Logout</a>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="flex justify-end p-6">
            <button onClick={toggleMenu} className="text-black text-lg">Close</button>
          </div>
          <ul className="menu-items">
            {['home', 'about', 'menu', 'reviews', 'contact'].map((section) => (
              <button key={section} onClick={() => { toggleMenu(); window.location.href = `#${section}`; }}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            <div className="mt-4 border-t pt-4 w-full text-center">
              {/* <a href="/login">Login</a> */}
              <a href="/signup">Signup</a>
              {/* <a href="/change-password">Change Password</a> */}
              <a href="/logout" className="logout">Logout</a>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
