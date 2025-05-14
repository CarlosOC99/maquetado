import React, { useEffect, useState } from 'react';
import Header from './header';
import OrderList from './orderList';

function Orders() {

    const [upcomingOrders, setUpcomingOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Upcoming");

    const filteredOrders = upcomingOrders
        .filter(order => {
            if (activeTab === "Upcoming") return order.status === 1;
            if (activeTab === "Completed") return order.status === 3;
            if (activeTab === "Past") return true;
            return false;
        })
        .filter(order =>
            order.order_number.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const [upcomingRes, allRes] = await Promise.all([
                    fetch('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming'),
                    fetch('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders'),
                ]);

                const upcomingData = await upcomingRes.json();
                const allData = await allRes.json();


                /* console.log('upcomingData:', upcomingData); */
                console.log('allData:', allData);

                setUpcomingOrders(upcomingData.result);
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
        <>
            <Header onSearch={setSearchTerm}
                activeTab={activeTab}
                setActiveTab={setActiveTab} />
            {filteredOrders.map((order, idx) => (
                <OrderList
                    key={idx}
                    destinations={order.destinations}
                    type={order.type}
                    is_today={order.is_today}
                    start_date={order.start_date}
                    order_number={order.order_number}
                    status={order.status}
                />
            ))}
        </>
    )
}

export default Orders