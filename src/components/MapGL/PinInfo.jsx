import React from "react";
import "./MapGL.scss";
const tabletojson = require("tabletojson");

export default function PinInfo(props) {
  const { properties, type } = props;

  return (
    <div style={{ fontSize: "8px" }}>
      <div className="pin-title">{properties.name}</div>
      <div className="pin-address">{properties.address}</div>
    </div>
  );
}
