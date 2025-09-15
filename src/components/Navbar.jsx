import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/'); // Redirect to homepage on logout
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        {/* Logo & Title */}
        <Link to="/" className="navbar-brand">
          <span className="navbar-title">Civic Sewa</span>
        </Link>

        {/* Main Links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/feedback" className="nav-link">Feedback</Link>
        </div>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="nav-button">Dashboard</Link>
              <button onClick={handleLogoutClick} className="nav-button logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button">Login</Link>
              <Link to="/register" className="nav-button">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
