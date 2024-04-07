import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const { profile } = useContext(UserContext);

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
      <div className="circular-image">
        <img
          src={`http://localhost:4000/api/public/${profile}`}
          alt="Your Image"
          title="Your Image"
        />
      </div>
    </nav>
  );
};

export default Navbar;
