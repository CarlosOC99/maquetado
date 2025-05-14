import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Bell, ChevronLeft, ChevronDown, ChevronUp, Pointer } from "lucide-react";
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

  const pickupStatuses = allOrders[0]?.result?.status_list?.pickup || [];
  const activeCount = pickupStatuses.filter(item => item.active).length;
  const isTrackEnabled = activeCount >= 3;

  const [selectedLocationType, setSelectedLocationType] = useState(null); // 0 o 1
  const [showLocationData, setShowLocationData] = useState(false);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')
      }/${date.getFullYear().toString().slice(-2)}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

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
                </div>
              )}
              <div className="order-info" onClick={() => {
                setSelectedLocationType(idx); // idx será 0 para pickup y 1 para dropoff
                setShowLocationData(true);
              }}>
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

          <p className="time">{formatTime(allOrders[0]?.start_date)}</p>

          {allOrders.length > 0 && (
            <ul className="steps">
              {allOrders[0].status_list.pickup.map((item, index) => (
                <li
                  key={index}
                  className={`step ${item.active ? 'checked' : 'pending'}`}
                >
                  <span className="icon"></span>
                  {item.status}
                </li>
              ))}
            </ul>
          )}

          <button
            className={`track-btn ${isTrackEnabled ? 'activeb' : 'unactive'}`}
            disabled={!isTrackEnabled}
          >
            Track Order
          </button>

        </div>
      </div>


      <div className="pickup-data-section">
        <button className="toggle-btn" onClick={() => setShowLocationData(!showLocationData)}>
          <span>{selectedLocationType === 0
            ? 'Pickup Data'
            : selectedLocationType === 1
              ? 'Dropoff Data'
              : 'No info available'}</span>
          {showLocationData ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {selectedLocationType === null && !showLocationData && (
          <p className="no-info-msg">No info available</p>
        )}

        {showLocationData && selectedLocationType !== null && (
          <div className="pickup-info">
            <p>{allOrders[0]?.destinations[selectedLocationType]?.address}</p>
            <p>
              {allOrders[0]?.destinations[selectedLocationType]?.startDate
                ? `${formatDate(allOrders[0].destinations[selectedLocationType].startDate)} • ${formatTime(allOrders[0].destinations[selectedLocationType].startDate)}`
                : 'Sin fecha'}
            </p>
            <p>{allOrders[0]?.destinations[selectedLocationType]?.contact_info?.telephone}</p>
            <p>{allOrders[0]?.destinations[selectedLocationType]?.contact_info?.email}</p>
          </div>
        )}
      </div>


    </div>
  );
};

export default OrderDetails;
