import React from "react";

export default function Select({
  name,
  options,
  keyName,
  handleChange,
  value
}) {
  const propertyName = `${name.toLowerCase().replace(/\s/, "-")}`;
  return (
    <div className="form-group">
      <label htmlFor={propertyName}>{name}</label>
      <select
        value={value}
        className="form-control"
        id={propertyName}
        name={keyName}
        onChange={handleChange}
      >
        <option>Choose One</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
