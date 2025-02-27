import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./OrderHistory.css"; // Import the external CSS file

const OrderHistory = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/order/history/${userId}`
        );
        console.log("Order History API Response:", response.data); // Debug log
        setOrders(response.data.orders);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch order history");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrderHistory();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="oloading-container">
        <div className="ospinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-box">
          <p className="error-text">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">Order History</h2>

      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={order._id || index} className="order-card">
              <div className="order-header">
                <span className="order-date">
                  📅 {new Date(order.purchasedAt || order.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="order-content">
                {order.products.length > 0 ? (
                  <ul className="oproduct-list">
                    {order.products.map((item, idx) => (
                      <li key={idx} className="oproduct-item">
                        <span className="oproduct-name">
                          {item.productId?.name || "Unknown Product"} (x{item.quantity})
                        </span>
                        <span className="oproduct-price">
                          ₹{item.productId?.price || 0} each
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-products-text">No products in this order.</p>
                )}

                {/* Total amount calculation */}
                {order.products.length > 0 && (
                  <p className="order-total">
                    💰 Total: ₹
                    {order.products.reduce(
                      (total, item) => total + (item.productId?.price || 0) * item.quantity,
                      0
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-orders-box">
          <p className="no-orders-text">No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
