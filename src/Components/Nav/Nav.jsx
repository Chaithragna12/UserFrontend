import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown, User } from "lucide-react";
import "./nav.css";
import logo from "../../assets/logo.png"; // Import your logo image

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
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

  const scrollToSection = (event, id) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Restaurant Logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links desktop">
          <a href="#home" className="nav-link" onClick={(e) => scrollToSection(e, "home")}>Home</a>
            {/* <Link to="/" className="nav-link">Home</Link> */}
            <a href="#about" className="nav-link" onClick={(e) => scrollToSection(e, "About")}>About Us</a>
            <a href="#menu" className="nav-link" onClick={(e) => scrollToSection(e, "Menu")}>Menu</a>
            <a href="#reviews" className="nav-link" onClick={(e) => scrollToSection(e, "Reviews")}>Reviews</a>
            <a href="#contact" className="nav-link" onClick={(e) => scrollToSection(e, "contact")}>Contact Us</a>

          </div>

          {/* Right Side Buttons */}
          <div className="navbar-right">
            <button className="cart-button" onClick={() => user?.userId ? navigate(`/buy/${user.userId}`) : navigate("/login")}>
              <ShoppingCart className="cart-icon" />
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
                    <button onClick={() => { localStorage.clear(); setUser(null); navigate("/"); }} className="dropdown-button">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/signup" className="signup-button">Sign up</Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="mobile-menu-button">
              {isMobileMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#home" className="nav-link" onClick={(e) => scrollToSection(e, "home")}>Home</a>
            <a href="#about" className="mobile-nav-link" onClick={(e) => scrollToSection(e, "About")}>About Us</a>
            <a href="#menu" className="mobile-nav-link" onClick={(e) => scrollToSection(e, "Menu")}>Menu</a>
            <a href="#reviews" className="mobile-nav-link" onClick={(e) => scrollToSection(e, "Reviews")}>Reviews</a>
            <a href="#contact" className="nav-link" onClick={(e) => scrollToSection(e, "contact")}>Contact Us</a>
            {!user && (
              <div className="mobile-auth">
                <Link to="/login" className="mobile-login">Login</Link>
                <Link to="/signup" className="mobile-signup">Sign up</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
