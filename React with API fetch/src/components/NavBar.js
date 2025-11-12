import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const { token, logout } = useContext(AuthContext);

  if (!token) return null; // hide NavBar until login

  return (
    <nav style={{ background: "#007bff", padding: "10px" }}>
      <Link to="/home" style={{ color: "white", marginRight: "10px" }}>
        Home
      </Link>
      <Link to="/about" style={{ color: "white", marginRight: "10px" }}>
        About
      </Link>
      
    </nav>
  );
}
