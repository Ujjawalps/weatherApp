const API_KEY = "e7bfa4bd8c7c44c1875111357232507";
const BASE_URL = "https://api.weatherapi.com/v1";

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

const GEO_API_KEY = "9bad42b8damshe980036daa32af1p171da0jsn373e8cf3f0c9"; // Replace with your API Key
const GEO_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

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
