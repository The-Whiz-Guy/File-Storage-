import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Connectwallet from "./Connectwallet";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isSmallScreen && isMobile); 
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <nav className="navbar">
      <h3 >
        <Link to="/" className="logo">BC-Store</Link>
      </h3>
      <ul
        className={isMobile ? "nav-links-mobile active" : "nav-links"}
        onClick={() => setIsMobile(false)}
      >
        <Link to="/Secondpage" className="item">
          <li>Upload</li>
        </Link>
        <Link to="/working" className="item">
          <li>Working</li>
        </Link>
        <Link to="/accessList" className="item">
          <li>Allowlist</li>
        </Link>
        <Link className="item">
          <li>
            <Connectwallet />
          </li>
        </Link>
      </ul>
      <button
        className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </button>
    </nav>
  );
};

export default Navbar;

