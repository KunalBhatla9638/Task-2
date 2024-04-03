import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/list"}>List</Link>
      </li>
      <li>
        <Link to={"/add"}>Add</Link>
      </li>
    </nav>
  );
};

export default Navbar;
