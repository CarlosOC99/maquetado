import React from "react";
import { useNavigate } from "react-router-dom";
import { Truck, MapPin, Eye } from "lucide-react";
import "../styles/OrderList.css"; // Asegúrate de importar los estilos

const OrderList = ({ destinations, is_today, start_date, order_number, status, type }) => {

    const navigate = useNavigate();
    const pickupStatus = getPickupStatus(start_date);

    const handleResumeClick = () => {
        navigate("/order-details"); // navega a la nueva ruta
    };

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

    return (
        <div className="order-container">
            <p className="order-id">
                Order <span className="order-id-highlight">#{order_number}</span>
            </p>

            <div className="order-card">
                <div className="order-header">
                    <div className="order-type">
                        <Truck size={20} />
                        <span>{type}</span>
                    </div>
                    <span
                        className={
                            status === 2
                                ? 'order-status transit'
                                : status === 3
                                    ? 'order-status completed'
                                    : 'order-status'
                        }
                    >
                        {status === 1
                            ? 'Assigned'
                            : status === 2
                                ? '● In transit'
                                : status === 3
                                    ? 'Completed'
                                    : ''}
                    </span>
                </div>

                <div className="order-section">
                    {destinations.map((dest, idx) => (
                        <div className="order-row" key={idx}>
                            {dest.nickname === 'Recolección' ? (
                                <Truck className="order-icon" size={18} />
                            ) : (
                                <MapPin className="order-icon" size={18} />
                            )}
                            <div className="order-info">
                                <p className="order-location">Mexico</p>
                                <p className="order-address">{dest.address || 'No Address Provided'}</p>
                            </div>
                            <div className="order-time">
                                <p>{formatDate(dest.start_date)}</p>
                                <p>{formatTime(dest.start_date)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="order-actions">
                    {pickupStatus.isNow ? (
                        <button className="pickup-button available">It's time for pickup</button>
                    ) : (
                        <button className="pickup-button" disabled>
                            {pickupStatus.message}
                        </button>
                    )}
                    <button className="resume-button" onClick={handleResumeClick}>
                        Resume <Eye size={16} color="#000000" style={{ background: "transparent" }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const getPickupStatus = (startTimestamp) => {
    const now = new Date();
    const startDate = new Date(startTimestamp);

    const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startMidnight = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

    const diffTime = startMidnight - nowMidnight;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
        console.log("Navegar");
        return { isNow: true };
    }

    return { isNow: false, message: `In ${diffDays} day${diffDays > 1 ? 's' : ''}` };
};

export default OrderList;
