import React from "react";

const WeatherCard = ({ weather, unit, addFavorite }) => {
  if (!weather) return null;

  return (
    <div className="mt-4 p-3 rounded text-center w-100 w-md-50 weather-card" style={{ maxWidth: "500px", width: "100%" }}>
      <h2>{weather.location.name}</h2>
      <p>{weather.current.condition.text}</p>
      <p>🌡️ {weather.current.temp_c}°{unit}</p>
      <p>💧 Humidity: {weather.current.humidity}%</p>
      <p>💨 Wind Speed: {weather.current.wind_kph} kph</p>
      <p>🌅 Sunrise: {weather.forecast?.forecastday[0]?.astro.sunrise || "N/A"}</p>
      <p>🌇 Sunset: {weather.forecast?.forecastday[0]?.astro.sunset || "N/A"}</p>
      <button className="btn btn-success mt-2" onClick={addFavorite}>
        ⭐ Save to Favorites
      </button>
    </div>
  );
};

export default WeatherCard;
