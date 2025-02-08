const API_KEY = "e7bfa4bd8c7c44c1875111357232507";
const BASE_URL = "https://api.weatherapi.com/v1";

// Fetch current weather by city name
export const fetchWeatherByCity = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};


// Fetch hourly & weekly forecast
export const fetchWeatherForecast = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return null;
  }
};

export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no&alerts=no`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather by GPS:", error);
    return null;
  }
};