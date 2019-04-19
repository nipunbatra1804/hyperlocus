import React from "react";
import { Link } from "react-router-dom";

export default function RecTable(props) {
  const { towns } = props;
  return (
    <div style={{ height: "550px", overflow: "auto" }}>
      <table className="table" style={{ fontSize: "auto" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Median Rent</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {towns.map((element, index) => (
            <tr key={index} data-testid="restaurant-table-row">
              <td>{element.name}</td>
              <td>{element.medRent}</td>
              <td>
                <Link
                  className="nav-item nav-link"
                  to={`/estate/${element.id}`}
                >
                  Show Me More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
