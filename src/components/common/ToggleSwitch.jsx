
import React, { useState } from "react";

const ToggleSwitch = ({ label, initialChecked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked); 
    }
  };

  return (
    <div className="form-check form-switch d-flex align-items-center">
      <input
        type="checkbox"
        className="form-check-input border-primary flex-shrink-0"
        checked={isChecked}
        onChange={handleToggle}
        style={{
          width: "6rem",
          height: "2.5rem",
        }}
        id="toggleSwitch"
      />
      {label && (
        <label className="form-check-label ms-2 text-wrap" htmlFor="toggleSwitch">
          {label}
        </label>
      )}
    </div>
  );
};

export default ToggleSwitch;

