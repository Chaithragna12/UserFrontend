import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./forgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Request OTP, 2: Reset Password
  const navigate = useNavigate(); // Initialize navigation

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://userbackend-385g.onrender.com/api/admin/forgot-password", { email });
      Swal.fire("Success!", response.data.message, "success");
      setStep(2); // Move to next step (OTP verification)
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://userbackend-385g.onrender.com/api/admin/reset-password", { email, otp, newPassword });
      Swal.fire("Success!", response.data.message, "success");
      setStep(1); // Reset process after success
      setEmail("");
      setOtp("");
      setNewPassword("");
      navigate("/signup"); // Redirect to login page
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="container">
      <h2>{step === 1 ? "Forgot Password" : "Reset Password"}</h2>
      {step === 1 ? (
        <form onSubmit={handleForgotPassword} className="form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="form">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
