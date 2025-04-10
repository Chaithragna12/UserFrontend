import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, X, ShoppingCart, ChevronDown, User, CheckCircle } from "lucide-react";
import "./nav.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedUserId = localStorage.getItem("userId");
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (storedEmail && storedUserId) {
      setUser({ email: storedEmail, userId: storedUserId });
    }

    setCartCount(cartItems.length);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      if (!user?.userId) {
        console.error("No user ID found");
        return;
      }
  
      const response = await axios.post(
        "https://userbackend-385g.onrender.com/api/admin/logout",
        { userId: user.userId }, // Send userId in the body
        { withCredentials: true }
      );
  
      localStorage.clear();
      setUser(null);
      setCartCount(0);
      
      // Show logout popup
      setShowLogoutPopup(true);
      
      // Automatically hide popup after 3 seconds and navigate
      setTimeout(() => {
        setShowLogoutPopup(false);
        navigate("/", { replace: true });
      }, 3000);
  
    } catch (error) {
      console.error("Error logging out:", error.response?.data?.error || error.message);
    }
  };
  
  // New function to handle mobile link clicks
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Logout Success Popup */}
      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="logout-popup-content">
            <CheckCircle className="popup-icon" />
            <p>Logged out successfully!</p>
          </div>
        </div>
      )}

      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="navbar-logo">
              <Link to="/" className="logo-link">
                <img src={logo} alt="Restaurant Logo" />
              </Link>
            </div>

            <div className="nav-links desktop">
              <a href="#home" className="nav-link">Home</a>
              <a href="#About" className="nav-link">About Us</a>
              <a href="#Menu" className="nav-link">Menu</a>
              <a href="#Reviews" className="nav-link">Reviews</a>
              <a href="#contact" className="nav-link">Contact Us</a>
            </div>

            <div className="navbar-right">
              <button className="cart-button" onClick={() => navigate(user?.userId ? `/order/${user.userId}` : "/login")}>
                <ShoppingCart className="ccart-icon" />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </button>

              {user ? (
                <div className="profile-menu">
                  <button onClick={() => setShowDropdown(!showDropdown)} className="profile-button">
                    <User className="profile-icon" />
                    <ChevronDown className={`dropdown-arrow ${showDropdown ? "rotated" : ""}`} />
                  </button>
                  {showDropdown && (
                    <div className="dropdown-menu">
                      <div className="dropdown-email">{user.email}</div>
                      <button onClick={handleLogout} className="dropdown-button">Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/signup" className="signup-button">Sign up</Link>
                </div>
              )}

              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="mobile-menu-button">
                {isMobileMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="mobile-menu">
              <a href="#home" className="mobile-nav-link" onClick={handleMobileLinkClick}>Home</a>
              <a href="#About" className="mobile-nav-link" onClick={handleMobileLinkClick}>About Us</a>
              <a href="#Menu" className="mobile-nav-link" onClick={handleMobileLinkClick}>Menu</a>
              <a href="#Reviews" className="mobile-nav-link" onClick={handleMobileLinkClick}>Reviews</a>
              <a href="#contact" className="mobile-nav-link" onClick={handleMobileLinkClick}>Contact Us</a>
              {!user && (
                <div className="mobile-auth">
                  <Link to="/signup" className="mobile-signup" onClick={handleMobileLinkClick}>Sign up</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;