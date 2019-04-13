import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar(props) {
  const { username } = props;
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
      <div className="navbar-nav  ml-auto">
        <NavLink className="nav-item nav-link" to="/create">
          Create
        </NavLink>
        {username === "" ? (
          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
        ) : (
          <NavLink className="nav-item nav-link" to="/">
            Hi {username}
          </NavLink>
        )}
      </div>
    </nav>
  );
}
/*
<ul className="navbar-nav ml-auto">
<li className="nav-item">
    <a className="nav-link" href="#">Right</a>
</li>
<li className="nav-item">
    <a className="nav-link" href="#">Link</a>
</li>
</ul>
*/
