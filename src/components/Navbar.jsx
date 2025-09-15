import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          Civic <span>Sewa</span>
        </Link>

        {/* Hamburger Icon (mobile only) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Links */}
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/about"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/services"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/feedback"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Feedback
          </Link>

          {/* Auth Buttons */}
          <div className="navbar-actions">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="nav-button primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogoutClick();
                    setMenuOpen(false);
                  }}
                  className="nav-button logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-button outline"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="nav-button primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
