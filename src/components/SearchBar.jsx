import React, { useState } from "react";

const SearchBar = ({ onSearch, onUseLocation }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <form onSubmit={handleSubmit} className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <button className="btn btn-secondary mt-2" onClick={onUseLocation}>
        📍 Use My Location
      </button>
    </div>
  );
};

export default SearchBar;
