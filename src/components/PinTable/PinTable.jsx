import React from "react";

export default function PinTable({ pins, handleClick, handleTableLeave }) {
  const sortedList = pins.sort((first, second) => {
    if (first.name < second.name) return -1;
    if (first.name > second.name) return 1;
    return 0;
  });
  return (
    <div style={{ height: "550px", overflow: "auto" }}>
      <table className="table" style={{ fontSize: "auto" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {sortedList.map((element, index) => (
            <tr key={index} data-testid="restaurant-table-row">
              <td
                onMouseEnter={() => handleClick(element)}
                onMouseLeave={handleTableLeave}
              >
                {element.properties.name}
              </td>
              <td>{element.properties.address}</td>
              <td>{element.properties.postCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
