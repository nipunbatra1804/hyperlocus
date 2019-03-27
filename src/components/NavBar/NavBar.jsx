import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <i className="fab fa-fort-awesome" /> Hyperl
        <i className="fab fa-500px" />
        c(us)
      </Link>

      <div className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/home">
          Home
        </NavLink>
        <NavLink className="nav-item nav-link" to="/explore">
          Explore
        </NavLink>
        <NavLink className="nav-item nav-link" to="/admin">
          Admin
        </NavLink>
      </div>
    </nav>
  );
}
