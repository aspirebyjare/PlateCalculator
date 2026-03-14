import React from "react";

export default function Toggle({ options = [], value, onChange }) {
  return (
    <div className="glass-segmented">
      {options.map((option) => (
        <button
          key={option}
          className={`glass-segment ${
            value === option ? "glass-segment-active" : ""
          }`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}