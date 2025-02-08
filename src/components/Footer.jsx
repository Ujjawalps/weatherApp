import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-2 mt-0 w-100">
      <p className="mb-1 small">
        &copy; {new Date().getFullYear()} Weather App | Built with ❤️ by <a href="https://github.com/Ujjawalps" className="text-white fw-bold" target="_blank">Ujjawal</a>
      </p>
      <p className="mb-0 small">
        Data from <a href="https://www.weatherapi.com/" className="text-white fw-bold" target="_blank" rel="noopener noreferrer">WeatherAPI</a>
      </p>
    </footer>


  );
};

export default Footer;




