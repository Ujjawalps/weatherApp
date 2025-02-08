import React from "react";

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button className="btn btn-secondary mt-2" onClick={toggleDarkMode}>
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
