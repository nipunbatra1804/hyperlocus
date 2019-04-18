import React from "react";
import "./MapGL.scss";

export default function EstateInfo(props) {
  const { name, address } = props;

  return (
    <div style={{ fontSize: "8px" }}>
      <div className="pin-title">{name}</div>
      <div className="pin-address">{address}</div>
    </div>
  );
}
