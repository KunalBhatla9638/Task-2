import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const { profile } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(profile);

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
          src={`http://localhost:4000/api/public/${profile?.uprofilepic}`}
          alt="Your Image"
          title="Your Image"
        />
      </div>
      <button
        onClick={() => {
          Cookies.remove("authToken", { path: "/" });
          navigate("/login");
        }}
      >
        {" "}
        Logout{" "}
      </button>
    </nav>
  );
};

export default Navbar;
