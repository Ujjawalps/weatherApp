import React, { useState } from "react";

const Favorites = ({ favorites, handleSearch, removeFavorite }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="position-relative">
      {/* Button to Toggle Dropdown */}
      <button className="btn btn-warning mt-2" onClick={() => setShowDropdown(!showDropdown)}>
        ⭐ Saved Locations
      </button>

      {/* Dropdown Menu */}
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
  );
};

export default Favorites;
