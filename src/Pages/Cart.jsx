import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, ShoppingCart, Trash2, Package } from 'lucide-react';
import './cart.css';

const Cart = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing");
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const { data } = await axios.get(`https://akshaya-be.onrender.com/api/admin/cart/${userId}`);
        setCart(data.cart);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete("https://akshaya-be.onrender.com/api/admin/cart/remove", {
        data: { userId, productId }
      });
      setCart(cart.filter((item) => item.productId._id !== productId));
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("https://akshaya-be.onrender.com/api/admin/cart/clear", {
        data: { userId }
      });
      setCart([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
      setError("Failed to clear cart");
    }
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post("https://akshaya-be.onrender.com/api/admin/order", { userId });

      if (response.status === 200) {
        console.log("Order placed successfully");
        alert("Order placed successfully! 🎉");
        navigate(`/order-history/${userId}`);

        const { data } = await axios.get(`https://akshaya-be.onrender.com/api/admin/cart/${userId}`);
        setCart(data.cart);
      }
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Failed to place order");
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Loader2 className="spinner-icon" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    );
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.productId.price, 0);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">
          <ShoppingCart className="cart-icon" />
          Your Cart
        </h1>
      </div>
      
      <div className="cart-content">
        {cart.length > 0 ? (
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-details">
                  <div className="item-image-placeholder">
                    <Package className="placeholder-icon" />
                  </div>
                  <div className="item-info">
                    <h3>{item.productId.name}</h3>
                    <p className="item-price">${item.productId.price}</p>
                  </div>
                </div>
                <button
                  className="button button-danger"
                  onClick={() => removeFromCart(item.productId._id)}
                >
                  <Trash2 className="button-icon" />
                </button>
              </div>
            ))}

            <div className="cart-summary">
              <div className="total-amount">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              
              <div className="button-group">
                <button
                  className="button button-outline"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <button
                  className="button button-primary"
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <ShoppingCart className="empty-cart-icon" />
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;