const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const GEO_API_KEY = import.meta.env.VITE_GEO_DB_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";
const GEO_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// Fetch current weather by city name
export const fetchWeatherByCity = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city},India&days=7&aqi=no&alerts=no`);
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


export const fetchCitySuggestions = async (query) => {
  try {
    const response = await fetch(`${GEO_BASE_URL}/cities?namePrefix=${query}&countryIds=IN&limit=5`, {
      headers: {
        "X-RapidAPI-Key": GEO_API_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
      }
    });
    
    if (!response.ok) return null;
    const data = await response.json();
    return data.data; // Returns array of matching cities
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return null;
  }
};
