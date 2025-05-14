import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Orders from './components/orders'
import OrderDetails from './components/orderDetails'
import './styles/orders.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/order-details" element={<OrderDetails />} />
      </Routes>
    </Router>
  )
}

export default App
