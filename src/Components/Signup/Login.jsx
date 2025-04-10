import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the external CSS

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://userbackend-385g.onrender.com/api/admin/login", formData);
  
      // console.log("Full Response:", response);
      // console.log("Response Data:", response.data);
  
      // Correct way to access userId
      if (response.data.user && response.data.user.userId) {
        localStorage.setItem("userId", response.data.user.userId);
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("isOnline", "true");
  
        // console.log("Navigating to Home...");
        navigate("/");
      } else {
        console.error("userId is missing in response:", response.data);
        setMessage("Login failed. Unexpected response structure.");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Sign in to your account</h2>
        <p className="login-subtitle">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="signup-link">
            Sign up
          </button>
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-footer">
            <div className="remember-me">
              <input id="remember-me" name="remember-me" type="checkbox" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <a href="#" className="forgot-password">
              Forgot your password?
            </a>
          </div>

          {message && <div className="error-message">{message}</div>}

          <button type="submit" disabled={loading} className={`login-button ${loading ? "loading" : ""}`}>
            {loading ? <div className="spinner"></div> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
