import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Bell, ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import '../styles/OrderDetails.css';

const OrderDetails = () => {
  const [showPickupData, setShowPickupData] = useState(false);

  const togglePickupData = () => {
    setShowPickupData(!showPickupData);
  };

  const navigate = useNavigate();
  const handleResumeClick = () => {
    navigate("/");
  };

  return (
    <div className="order-details-container">

      <div className="header-top">
        <button className="icon-button" onClick={handleResumeClick}>
          <ChevronLeft className="icon" />
        </button>
        <h1 className="header-title">Cargo Details</h1>
        <button className="icon-button">
          <Bell className="icon" color="#facc15" />
        </button>
      </div>

      <div className="order-summary">
        <p className="reference">Referencia A1180</p>
        <h2>Order #7804GNZ</h2>

        <div className="location">
          <div className="location-point accepted">
            <span className="icon">🚚</span>
            <div>
              <strong>Pickup</strong>
              <p>New York</p>
              <p>25 Mortada street, Gainalkes...</p>
              <span className="status accepted">Accepted</span>
            </div>
          </div>

          <div className="location-point onhold">
            <div>
              <strong>Dropoff</strong>
              <p>New York</p>
              <p>1789 NJ-27, Edison, 08817...</p>
              <span className="status onhold">On hold</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tracking-card">
        <img
          src="https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png"
          alt="User"
          className="user-image"
        />
        <p className="time">10:30 PM</p>

        <ul className="steps">
          <li className="checked">Created Order</li>
          <li className="checked">Accepted Order</li>
          <li className="checked">Pickup set up by William</li>
          <li className="pending">Pickup Completed</li>
        </ul>

        <button className="track-btn">Track Order</button>
      </div>

      <div className="pickup-data-section">
        <button className="toggle-btn" onClick={togglePickupData}>
          <span>Pickup Data</span>
          {showPickupData ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {showPickupData && (
          <div className="pickup-info">
            <p>Isidro Fabela 10, Valle Verde y Terminal, 50140 Toluca de Lerdo, México</p>
            <p>14 de Octubre 2023 • 10:30</p>
            <p>+525567890346</p>
            <p>johndoe@gmail.com</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
