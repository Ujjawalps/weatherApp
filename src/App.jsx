import React, { useState, useEffect } from 'react';
import Header from './components/Header';  // ✅ Import Header
import SearchBar from './components/SearchBar';
import WeatherForecast from './components/WeatherForecast';
import WeatherCard from './components/WeatherCard';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { fetchWeatherByCity, fetchWeatherForecast, fetchWeatherByCoords } from './api/weatherApi';
import sunnyBg from './assets/sunny.jpg';
import rainyBg from './assets/rainy.jpg';
import cloudyBg from './assets/cloudy.jpg';
import snowyBg from './assets/snowy.jpg';
import defaultBg from './assets/default.jpg';
import './styles/DarkMode.css';

const getBackgroundImage = (condition) => {
  if (!condition) return defaultBg; 

  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) return sunnyBg;
  if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle") || lowerCondition.includes("shower")) return rainyBg;
  if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) return cloudyBg;
  if (lowerCondition.includes("snow") || lowerCondition.includes("ice")) return snowyBg;
  if (lowerCondition.includes("mist") || lowerCondition.includes("fog") || lowerCondition.includes("haze")) return cloudyBg;

  return defaultBg;
};

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("C");
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    if (localStorage.getItem("darkMode") === "true") setDarkMode(true);
  }, []);

  const toggleUnit = () => setUnit(unit === "C" ? "F" : "C");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  const getWeather = async (lat, lon) => {
    setLoading(true);
    const weatherData = await fetchWeatherByCoords(lat, lon);
    setWeather(weatherData);
    setForecast(weatherData);
    setLoading(false);
  };

  const handleSearch = async (city) => {
    setLoading(true);
    const weatherData = await fetchWeatherByCity(city);
    const forecastData = weatherData?.forecast ? await fetchWeatherForecast(city) : null;
    setWeather(weatherData);
    setForecast(forecastData);
    setLoading(false);
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await getWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please allow location access.");
      }
    );
  };

  const addFavorite = () => {
    if (!weather || !weather.location) return;
    const city = weather.location.name;

    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(city)) return prevFavorites; // Avoid duplicates
      const updatedFavorites = [...prevFavorites, city];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className={`d-flex flex-column min-vh-100 ${darkMode ? "dark-mode" : ""}`}>
      
      {/* ✅ New Header Component */}
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        unit={unit} 
        toggleUnit={toggleUnit} 
        favorites={favorites}
        handleSearch={handleSearch}
        removeFavorite={removeFavorite}
      />

      <div className="container-fluid text-center min-vh-100 d-flex flex-column justify-content-center align-items-center"
        style={{ 
          backgroundImage: `url(${getBackgroundImage(weather?.current?.condition?.text)})`,
          backgroundSize: "cover", // ✅ Ensures full image without stretching
          backgroundPosition: "center center", // ✅ Centers the image
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed" // ✅ Prevents weird mobile scrolling
        }}>

        
        <SearchBar onSearch={handleSearch} onUseLocation={handleUseLocation} />
        {loading && <Loader />}
        {!loading && weather && <WeatherCard weather={weather} unit={unit} addFavorite={addFavorite} />}
        {!loading && forecast && <WeatherForecast forecast={forecast} unit={unit} />}
      </div>

      <Footer />
    </div>
  );
};

export default App;
