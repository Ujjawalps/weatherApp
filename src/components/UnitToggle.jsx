import React from "react";

const UnitToggle = ({ unit, toggleUnit }) => {
  return (
    <button className="btn btn-primary mt-2 mx-2" onClick={toggleUnit}>
      Switch to °{unit === "C" ? "F" : "C"}
    </button>
  );
};

export default UnitToggle;
