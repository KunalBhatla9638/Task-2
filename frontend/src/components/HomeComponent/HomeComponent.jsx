import React from "react";
import { Link } from "react-router-dom";

import "./HomeComponent.css";

function HomeComponent() {
  return (
    <div>
      <ol>
        {/* <li>Home</li> */}
        <Link to={"/list"}>
          <li>list</li>
        </Link>
        <Link to={"/add"}>
          <li>add</li>
        </Link>
      </ol>
    </div>
  );
}

export default HomeComponent;
