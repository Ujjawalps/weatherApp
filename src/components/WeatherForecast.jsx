import React, { useRef, useState } from "react";

const convertTemperature = (temp, unit) => {
  return unit === "C" ? temp : (temp * 9) / 5 + 32;
};

const WeatherForecast = ({ forecast, unit }) => {
  if (!forecast) return null;

  const scrollRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const itemsPerViewDesktop = 5; // Show 5 items at a time on desktop
  const totalHours = forecast.forecast.forecastday[0].hour.length;

  // Function to get weather condition icons
  const getWeatherIcon = (condition) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes("sunny") || lowerCondition.includes("clear")) return "☀️";
    if (lowerCondition.includes("partly cloudy")) return "🌤️";
    if (lowerCondition.includes("cloudy") || lowerCondition.includes("overcast")) return "☁️";
    if (lowerCondition.includes("rain") || lowerCondition.includes("shower")) return "🌧️";
    return "❓"; // Default icon if unknown condition
  };

  // Scroll functions for desktop
  const scrollLeft = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
      scrollRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (scrollIndex < totalHours - itemsPerViewDesktop) {
      setScrollIndex(scrollIndex + 1);
      scrollRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className="mt-4 position-relative">
      {/* Hourly Forecast */}
      <h3>🌡️ Hourly Forecast</h3>

      <div className="position-relative">
        {/* Left Scroll Button (Only for Desktop) */}
        <button
          className="btn btn-dark position-absolute top-50 start-0 translate-middle-y d-none d-md-block"
          onClick={scrollLeft}
          disabled={scrollIndex === 0}
          style={{ zIndex: 10, transform: "translate(-50%, -50%)" }}
        >
          ◀
        </button>

        {/* Scrollable Hourly Forecast */}
        <div
          ref={scrollRef}
          className="d-flex overflow-auto mx-auto px-3"
          style={{
            width: "90vw",
            maxWidth: "500px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            whiteSpace: "nowrap",
            borderRadius: "10px",
            padding: "10px 0",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {forecast.forecast.forecastday[0].hour.map((hour, index) => (
            <div
              key={index}
              className="card p-2 mx-2 text-center"
              style={{
                minWidth: "90px",
                flex: "0 0 auto",
              }}
            >
              <p>{hour.time.split(" ")[1]}</p>
              <p>🌡️ {convertTemperature(hour.temp_c, unit).toFixed(1)}°{unit}</p>
            </div>
          ))}
        </div>

        {/* Right Scroll Button (Only for Desktop) */}
        <button
          className="btn btn-dark position-absolute top-50 end-0 translate-middle-y d-none d-md-block"
          onClick={scrollRight}
          disabled={scrollIndex >= totalHours - itemsPerViewDesktop}
          style={{ zIndex: 10, transform: "translate(50%, -50%)" }}
        >
          ▶
        </button>
      </div>

      {/* Weekly Forecast */}
      <h3 className="mt-4">📅 3-Day Forecast</h3>
      <div
        className="d-flex flex-wrap justify-content-center gap-3 mt-3"
        style={{
          width: "92vw",
          maxWidth: "520px",
        }}
      >
        {forecast.forecast.forecastday.slice(0, 3).map((day, index) => (
          <div key={index} className="card p-3 text-center" style={{ width: "280px", maxWidth: "90vw" }}>
            <p>{day.date}</p>
            <p>{getWeatherIcon(day.day.condition.text)} {day.day.condition.text}</p>
            <p>🌡️ {convertTemperature(day.day.avgtemp_c, unit).toFixed(1)}°{unit}</p>
            <p>🌙 {convertTemperature(day.day.mintemp_c, unit).toFixed(1)}°{unit}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default WeatherForecast;
