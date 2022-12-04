import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: "60%",
        margin: "0 auto",
      }}
    >
      <NavLink to="/">HOME</NavLink>
      <NavLink to="add">ADD</NavLink>
    </div>
  );
}

export default Navbar;
