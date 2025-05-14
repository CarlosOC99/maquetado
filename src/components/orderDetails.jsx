import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Bell, ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Truck, MapPin, Eye } from "lucide-react";
import '../styles/OrderDetails.css';

const OrderDetails = () => {
  const { id } = useParams();
  const [showPickupData, setShowPickupData] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const togglePickupData = () => {
    setShowPickupData(!showPickupData);
  };
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleResumeClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [allRes] = await Promise.all([
          fetch('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders'),
        ]);

        const allData = await allRes.json();
        console.log('allData:', allData);

        setAllOrders([allData.result]);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Cargando pedidos...</p>;

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
        <p className="reference">Referencia {allOrders[0]?.reference_number}</p>
        <h2 className="reference-id">Order #{id}</h2>


        <div className="order-section">
          {allOrders[0]?.destinations?.map((dest, idx) => (
            <div className="order-row" key={idx}>
              {idx === 0 ? (
                <div className="icon-wrapper">
                  <div className="icon-inner">
                    <Truck className="order-icon" size={18} color="#000000" style={{ background: "transparent" }} />
                  </div>
                </div>

              ) : (
                <div className="icon-wrapper2">
                  <div className="icon-inner2">
                  </div>
                </div>
              )}
              <div className="order-info">
                <p className="order-location">{idx === 0 ? 'Pickup' : 'Dropoff'}</p>
                <p className="order-location">Mexico</p>
                <p className="order-address compress">{dest.address || 'No Address Provided'}</p>
                <p className={dest.status_string === 'En espera' ? 'order-address status' : 'order-address status colored'}>● {dest.status_string}
                </p>
              </div>
            </div>
          ))}
        </div>


      </div>

      <div className="tracking-card">
        <div className="tracking-intern">
          <div className="user-container">
            <img
              src="https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png"
              alt="User"
              className="user-image"
            />
          </div>

          <p className="time">10:30 PM</p>

          <ul className="steps">
            <li className="step checked">
              <span className="icon"></span>
              Created Order
            </li>
            <li className="step checked">
              <span className="icon"></span>
              Accepted Order
            </li>
            <li className="step unchecked">
              <span className="icon"></span>
              Pickup set up by William
            </li>
            <li className="step pending">
              <span className="icon"></span>
              Pickup Completed
            </li>
          </ul>

          <button className="track-btn">Track Order</button>
        </div>
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
