import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";
import "./menus.css";
import Popup from "./Popup"; // Import the Popup component

const ProductsByCategory = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [groupedProducts, setGroupedProducts] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    // Popup state
    const [popup, setPopup] = useState({
        isOpen: false,
        message: "",
        type: "success"
    });

    const fetchData = async () => {
        try {
            // Set loading to true at the start of data fetching
            setIsLoading(true);

            // Fetch categories
            const categoriesRes = await fetch("https://adminbackend-dg8o.onrender.com/api/categories/categories");
            const categoriesData = await categoriesRes.json();
            setCategories(categoriesData);

            // Fetch products
            const productsRes = await fetch("https://adminbackend-dg8o.onrender.com/api/products/all");
            const productsData = await productsRes.json();
            setProducts(productsData);

            // Group products by category
            const grouped = productsData.reduce((acc, product) => {
                const categoryId = product.category._id;
                if (!acc[categoryId]) acc[categoryId] = [];
                acc[categoryId].push(product);
                return acc;
            }, {});
            
            setGroupedProducts(grouped);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Show error popup
            showPopup("Failed to load menu items. Please try again.", "error");
            // Ensure loading state is turned off even if there's an error
            setIsLoading(false);
        } finally {
            // Ensure loading state is turned off after data fetching
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Fetch data when component mounts
        fetchData();
    }, []);

    // Function to show popup
    const showPopup = (message, type = "success") => {
        setPopup({
            isOpen: true,
            message,
            type
        });
    };

    // Function to close popup
    const closePopup = () => {
        setPopup({
            ...popup,
            isOpen: false
        });
    };

    const addToCart = async (productId, productName) => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            // Show login required popup instead of alert
            showPopup("Please log in to add items to your cart.", "warning");
            // Wait a moment before redirecting to let the user see the message
            setTimeout(() => {
                navigate("/login");
            }, 1500);
            return;
        }
        
        try {
            await axios.post("https://userbackend-385g.onrender.com/api/admin/add", {
                userId: localStorage.getItem("userId"),
                productId,
                quantity: 1
            });
            // Show success popup instead of alert
            showPopup(`${productName} added to your cart!`, "success");
        } catch (error) {
            console.error("Error adding to cart:", error);
            // Show error popup
            showPopup("Failed to add item to cart. Please try again.", "error");
        }
    };

    const validCategories = categories.filter(category => 
        groupedProducts[category._id]?.length > 0
    );

    if (isLoading) {
        return (
            <div className="floader-container">
                <div className="floader"></div>
            </div>
        );
    }

    return (
        <div className="fmenu-container">
            {/* Popup Component */}
            <Popup 
                message={popup.message}
                type={popup.type}
                isOpen={popup.isOpen}
                onClose={closePopup}
            />

            <div className="fheader">
                <button className="fhome-button" onClick={() => navigate("/")}>
                    <HomeIcon className="icon" />
                </button>
                <h1 className="fmenu-title">Explore Our Menu</h1>
            </div>

            <div className="fmenu-grid">
                {validCategories.map(category => (
                    <div key={category._id} className="fcategory-card">
                        <div className="fcategory-image-container">
                            <img 
                                src={category.photo} 
                                alt={category.name} 
                                className="fcategory-image" 
                            />
                        </div>
                        <h2 className="fcategory-name">{category.name}</h2>
                        
                        <div className="fproduct-list">
                            {groupedProducts[category._id]?.map(product => (
                                <div key={product._id} className="fproduct-item">
                                    <span className="fproduct-name">{product.name}</span>
                                    <span className="fproduct-price">₹{product.price}</span>
                                    <button 
                                        className="fadd-to-cart" 
                                        onClick={() => addToCart(product._id, product.name)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsByCategory;