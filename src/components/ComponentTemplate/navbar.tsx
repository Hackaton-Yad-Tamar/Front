import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav style={{ background: "blue", padding: "10px", width: "100%" }}>
      <ul style={{ display: "flex", gap: "15px", listStyle: "none", padding: 0 }}>
        <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Home Page</Link></li>
        <li><Link to="/profile" style={{ color: "white", textDecoration: "none" }}>Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;