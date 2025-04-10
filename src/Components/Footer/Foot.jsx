import React, { useState } from "react";
import Web_plus_academy_logo from "../../assets/WPAlogo.png";
import "./foot.css"; // Import the new CSS file

const MapSection = () => {
  return (
    <div className="">
{/* 📜 Footer */}
<div className="foot">
  <div className="foot-content">
    {/* Left Side - Logo */}
    <div className="foot-logo">
      <img src={Web_plus_academy_logo} alt="Web Plus Academy Logo" />
    </div>

    {/* Center Content */}
    <div className="foot-text">
      <p>© 2025 Akshaya. All Rights Reserved</p>
      <p>Script Design & Development by</p>
      <p className="foot-bold">SAREDUFY WebplusAcademy Pvt. Ltd.</p>
    </div>
  </div>
</div>



      {/* 🔥 Logo */}
      {/* <div className="logo-container">
        <img src={Web_plus_academy_logo} alt="Web Plus Academy Logo" />
      </div> */}
    </div>
  );
};
export default MapSection;