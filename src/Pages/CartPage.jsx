import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Trash2 } from 'lucide-react';
import './cart.css';

const Cart = ({ userId }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [removedItemName, setRemovedItemName] = useState("");

  // Handle back to home navigation
  const handleBackToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    fetchCart();
    fetchOrderHistory();
  }, []);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const res = await axios.get(`https://userbackend-385g.onrender.com/api/admin/cart/${userId}`);
      setCart(res.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setMessage("Failed to fetch cart.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch order history
  const fetchOrderHistory = async () => {
    try {
      const res = await axios.get(`https://userbackend-385g.onrender.com/api/admin/order/history/${userId}`);
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Error fetching order history:", error);
      setMessage("Failed to fetch order history.");
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId, productName) => {
    try {
      const res = await axios.delete("https://userbackend-385g.onrender.com/api/admin/cart/remove", {
        data: { userId, productId },
      });

      // Set removed item name for popup
      setRemovedItemName(productName);
      
      // Show remove popup
      setShowRemovePopup(true);
      
      // Automatically hide popup after 3 seconds
      setTimeout(() => {
        setShowRemovePopup(false);
      }, 3000);

      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
      setMessage("Failed to remove item.");
    }
  };

  // Close remove popup manually
  const closeRemovePopup = () => {
    setShowRemovePopup(false);
  };

  // Place order and update order history
  const placeOrder = async () => {
    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    try {
      const res = await axios.post("https://userbackend-385g.onrender.com/api/admin/order", {
        userId,
        items: cart.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
      });

      // Show order success popup
      setShowOrderPopup(true);
      
      // Automatically hide popup after 3 seconds
      setTimeout(() => {
        setShowOrderPopup(false);
      }, 3000);

      fetchCart();
      fetchOrderHistory();
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("Failed to place order.");
    }
  };

  // Close popup manually
  const closeOrderPopup = () => {
    setShowOrderPopup(false);
  };

  return (
    <div className="cart-container">
      {/* Remove Item Popup */}
      {showRemovePopup && (
        <div className="remove-popup">
          <div className="remove-popup-content">
            <Trash2 className="popup-icon" />
            <h3>Item Removed</h3>
            <p>{removedItemName} has been removed from your cart.</p>
            <button onClick={closeRemovePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Order Success Popup */}
      {showOrderPopup && (
        <div className="order-popup">
          <div className="order-popup-content">
            <CheckCircle className="popup-icon" />
            <h3>Order Placed Successfully!</h3>
            <p>Your order has been processed and is being prepared.</p>
            <button onClick={closeOrderPopup}>Close</button>
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="back-btn-container">
        <button 
          className="back-btn" 
          onClick={handleBackToHome}
        >
         <ArrowLeft /> Back to Home
        </button>
      </div>

      <div className="cart-section">
        <h2 className="section-title">Your Cart</h2>
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : cart.length === 0 ? (
          <p className="empty-message">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.productId._id} className="cart-item">
                  <div className="item-details">
                    <span className="item-name">{item.productId.name}</span>
                    <span className="item-price">
                    ₹{item.productId.price} × {item.quantity}
                    </span>
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(item.productId._id, item.productId.name)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button 
              className="place-order-btn" 
              onClick={placeOrder} 
              disabled={cart.length === 0}
            >
              Place Order
            </button>
          </div>
        )}
        {message && <p className="message">{message}</p>}
      </div>

      <div className="order-history-section">
        <h2 className="section-title">Order History</h2>
        {orders.length === 0 ? (
          <p className="empty-message">No orders found.</p>
        ) : (
          <div className="order-list">
            {orders.map((order, index) => {
              const totalOrderPrice = order.products.reduce(
                (acc, product) => acc + product.productId.price * product.quantity, 0
              );

              return (
                <div key={index} className="order-item">
                  <div className="order-header">
                    <span className="order-status">{order.orderStatus}</span>
                    <span className="order-total">
                      Total: ₹{totalOrderPrice.toFixed(2)}
                    </span>
                  </div>
                  <ul className="order-products">
                    {order.products.map((product) => (
                      <li key={product.productId._id} className="order-product">
                        <div className="product-details">
                          <span>{product.productId.name}</span>
                          <span className="product-quantity">
                            {product.quantity} × ₹{product.productId.price}
                          </span>
                        </div>
                        <span className="product-total">
                        ₹{(product.productId.price * product.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;