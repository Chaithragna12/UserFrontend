import { useState, useEffect } from "react";
import axios from "axios";
import {fullmenu1, fullmenu2, fullmenu3,fullmenu5,fullmenu6,fullmenu7,fullmenu8,fullmenu9,fullmenu10,fullmenu11,fullmenu12,fullmenu13,mainCourse,fullmenu14,fullmenu15,fullmenu16,fullmenu17, defaultImage } from '../assets/assets';
import './demo.css';
import Nav from '../Components/Nav/Nav'

const categoryImages = {
  biryaniitems: fullmenu1,
  vegstaters: fullmenu2,
  nonvegstarters: fullmenu3,
  soups: fullmenu5,
  tandooridelights: fullmenu6,
  tandooribreads: fullmenu7,
  snacks: fullmenu8, // Assign a relevant image
  chinesefriedrice: fullmenu9,
  beverages: fullmenu10,
  milkshakes: fullmenu11, // Use beverages image or add a new one
  icecream: fullmenu12,
  veg: fullmenu13,
  chicken: fullmenu14,
  paneer: fullmenu15,
  mutton: fullmenu16,
  seafood: fullmenu17,
};


const RestaurantMenu = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null); // Store user ID dynamically

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://akshaya-be.onrender.com/api/admin/all");
        setProducts(response.data);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch user ID from localStorage or default
    const storedUserId = localStorage.getItem("userId") || "defaultUserId";
    setUserId(storedUserId);

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!userId) {
      alert("User not logged in");
      return;
    }

    try {
      const response = await axios.post("https://akshaya-be.onrender.com/api/admin/add", {
        userId,
        productId,
        quantity: 1
      });

      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart");
    }
  };

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const normalizedCategory = product.category.toLowerCase().replace(/\s+/g, '');
    if (!acc[normalizedCategory]) {
      acc[normalizedCategory] = [];
    }
    acc[normalizedCategory].push(product);
    return acc;
  }, {});

  // Debugging logs
  console.log("Product Categories:", Object.keys(groupedProducts));
  console.log("Available Image Keys:", Object.keys(categoryImages));

  if (isLoading) {
    return (
      <div className="cmenu-container">
        <div className="cloading-container">
          <div className="cloading-spinner" />
          <p className="cloading-text">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cmenu-container">
        <Nav />

      <div className="cmenu-header">
        <h1 className="cmenu-title">Our Menu</h1>
        <div className="cmenu-divider"></div>
      </div>

      <div className="cmenu-masonry">
        {Object.entries(groupedProducts).map(([category, categoryProducts], index) => {
          const normalizedCategory = category.toLowerCase().replace(/\s+/g, '');
          const categoryImage = categoryImages[normalizedCategory] || defaultImage;

          return (
            <div 
              key={category} 
              className="ccategory-card"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animation: 'fadeInUp 0.5s ease forwards'
              }}
            >
              <div className="ccategory-image-container">
                <img
                  src={categoryImage}
                  alt={category}
                  className="ccategory-image"
                />
                <div className="ccategory-overlay" />
                <h2 className="ccategory-title">{category}</h2>
              </div>

              <div className="cproducts-container">
                {categoryProducts.map((product, idx) => (
                  <div 
                    key={product._id} 
                    className="cproduct-item"
                    style={{ 
                      animationDelay: `${(index * 0.1) + (idx * 0.05)}s`,
                      opacity: 0,
                      animation: 'fadeInRight 0.5s ease forwards'
                    }}
                  >
                    <span className="cproduct-name">{product.name}</span>
                    <div className="cprice-container">
                      <span className="cproduct-price">₹{product.price}</span>
                    </div>
                    <button 
                      className="cadd-to-cart-button" 
                      onClick={() => addToCart(product._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="cmenu-footer">
        <div className="cfooter-divider"></div>
        <p className="cfooter-text">Prices are inclusive of all taxes</p>
      </div>
    </div>
  );
};

export default RestaurantMenu;
