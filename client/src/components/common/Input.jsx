import React from "react";

function camelize(str) {
  let strMod = str.replace(/\s+(.)/g, function(match, chr) {
    return chr.toUpperCase();
  });
  //return strMod;
  return strMod.charAt(0).toLowerCase() + strMod.slice(1);
}

export default function Input({ type, name, handleChange, value }) {
  const propertyName = `${name.toLowerCase().replace(/\s/, "-")}-input`;
  const nameAttr = camelize(name);
  return (
    <React.Fragment>
      <label htmlFor={propertyName}>{name}</label>
      <input
        type={type}
        className="form-control"
        id={propertyName}
        onChange={handleChange}
        name={nameAttr}
        value={value}
      />
    </React.Fragment>
  );
}
