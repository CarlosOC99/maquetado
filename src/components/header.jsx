import { useState } from "react";
import { Bell, ChevronLeft, Search } from "lucide-react";
import "../styles/Header.css";

export default function CargoOrdersHeader({ onSearch, activeTab, setActiveTab }) {
  const tabs = ["Upcoming", "Completed", "Past"];

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="cargo-header">
      <div className="header-top">
        <button className="icon-button">
          <ChevronLeft className="icon" />
        </button>
        <h1 className="header-title">Cargo Orders</h1>
        <button className="icon-button">
          <Bell className="icon" color="#facc15" />
        </button>
      </div>

      {/* Menu */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* busqueda */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          onChange={handleChange}
        />
        <span className="search-icon">
          <Search className="icon" />
        </span>
      </div>
    </div>
  );
}
