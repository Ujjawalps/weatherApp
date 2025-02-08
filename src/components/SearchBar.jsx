import React, { useState } from "react";
import { fetchCitySuggestions } from "../api/weatherApi";

const SearchBar = ({ onSearch, onUseLocation }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) { // Fetch only if 3+ letters typed
      const results = await fetchCitySuggestions(value);
      setSuggestions(results || []);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    setQuery(city.city); // Set selected city in input
    setSuggestions([]);  // Hide suggestions
    onSearch(city.city); // Fetch weather for selected city
  };

  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        placeholder="Enter city name..."
        value={query}
        onChange={handleInputChange}
      />

      {/* Display Suggestions */}
      {suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100">
          {suggestions.map((city) => (
            <li key={city.id} className="list-group-item list-group-item-action" onClick={() => handleSelect(city)}>
              {city.city}, {city.region}
            </li>
          ))}
        </ul>
      )}

      {/* Use My Location Button */}
      <button className="btn btn-secondary mt-2" onClick={onUseLocation}>
        📍 Use My Location
      </button>
    </div>
  );
};

export default SearchBar;
