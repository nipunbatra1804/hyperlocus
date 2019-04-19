import React from "react";
import { Link } from "react-router-dom";
import "./MapGL.scss";

export default function EstateInfo(props) {
  const { name, address, id } = props;

  return (
    <div style={{ fontSize: "8px" }}>
      <div className="pin-title">{name}</div>
      <div className="pin-address">{address}</div>
      <div>
        <Link className="nav-item nav-link" to={`/estate/${id}`}>
          Understand
        </Link>
      </div>
    </div>
  );
}
