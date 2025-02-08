import React, { useState } from "react";

const Header = ({ darkMode, toggleDarkMode, unit, toggleUnit, favorites, handleSearch, removeFavorite }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-dark text-white w-100">
      <h2 className="m-0">🌤️ Weather App</h2>

      <div className="d-flex align-items-center gap-3">
        {/* Theme Toggle */}
        <button className="btn btn-light d-flex align-items-center" onClick={toggleDarkMode}>
          <span className="d-none d-md-inline">{darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}</span>
          <span className="d-md-none">{darkMode ? "☀️" : "🌙"}</span>
        </button>

        {/* Temperature Unit Toggle */}
        <button className="btn btn-primary d-flex align-items-center" onClick={toggleUnit}>
          <span className="d-none d-md-inline">Switch to °{unit === "C" ? "F" : "C"}</span>
          <span className="d-md-none">🌡️</span>
        </button>

        {/* Saved Locations Dropdown */}
        <div className="position-relative">
          <button className="btn btn-warning d-flex align-items-center" onClick={() => setShowDropdown(!showDropdown)}>
            <span className="d-none d-md-inline">⭐ Saved Locations</span>
            <span className="d-md-none">⭐</span>
          </button>

          {showDropdown && (
            <div className="dropdown-menu show p-2 text-center position-absolute" style={{ right: 0, zIndex: 10 }}>
              <h6 className="dropdown-header">Saved Locations</h6>
              {favorites.length === 0 ? (
                <p className="text-muted">No saved locations</p>
              ) : (
                favorites.map((city, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center p-1">
                    <button className="btn btn-secondary btn-sm me-2" onClick={() => handleSearch(city)}>
                      {city}
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFavorite(city)}>❌</button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
