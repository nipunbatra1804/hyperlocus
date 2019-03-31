import React, { useState } from "react";
import "./FilterMenu.scss";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default function FilterMenu(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    options,
    selected,
    handleClick,
    sortOptions,
    handleSortSelect
  } = props;
  const getClass = (option, selected) => {
    if (selected && option.name === selected.name) return "btn btn-primary";
    if (!selected && option.value === "all") return "btn btn-primary";

    return "btn btn-outline-secondary";
  };
  const toggle = () => {
    const prevDropDown = dropdownOpen;
    setDropdownOpen(!prevDropDown);
  };

  return (
    <div className="btn-group mt-2" role="group" style={{ display: "flex" }}>
      {options.map((option, index) => (
        <button
          key={index}
          type="button"
          className={getClass(option, selected)}
          onClick={() => handleClick(option)}
          data-testid={`filter-btn-${option.value.toLowerCase()}`}
        >
          {option.name}
        </button>
      ))}
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Sort By</DropdownToggle>
        <DropdownMenu>
          {sortOptions.map((item, index) => (
            <DropdownItem key={index} onClick={() => handleSortSelect(item)}>
              {item.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
