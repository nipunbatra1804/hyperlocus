import React from "react";
import { Link } from "react-router-dom";
import "./MapGL.scss";

export default function EstateInfo(props) {
  const { name, address, id } = props;

  return (
    <div style={{ fontSize: "8px" }}>
      <div className="pin-title">{name}</div>
      <div className="pin-address">{address}</div>
      <Link className="nav-item nav-link" to={`/estate/${id}`}>
        Understand
      </Link>
      <img
        src={`https://s3-ap-southeast-1.amazonaws.com/hyperlocusimages/${id}.jpg`}
        style={{ width: "256px", height: "256px" }}
      />
    </div>
  );
}
