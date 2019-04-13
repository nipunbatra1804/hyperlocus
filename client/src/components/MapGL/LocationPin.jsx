import React from "react";

const pinStyle = {
  cursor: "pointer",
  fill: "#d00",
  stroke: "none"
};
const getClassName = type => {
  switch (type) {
    case "retail":
      return "fas fa-cart-arrow-down";
    case "health":
      return "fas fa-clinic-medical";
    case "hawkerCentre":
      return "fas fa-utensils";
    case "food":
      return "fas fa-utensils";
    default:
      return "far fa-compass";
  }
};

export default function LocationPin(props) {
  const { size = 20, onClick, type } = props;

  return (
    <i
      className={getClassName(type)}
      style={{
        ...pinStyle,
        transform: `translate(${-size / 2}px,${-size}px)`
      }}
      onClick={onClick}
    />
  );
}
