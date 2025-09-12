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
        {/* The logo and title are now a single link to the homepage */}
        <Link to="/" className="navbar-brand">
          <img src="./assets/logo.png" alt="Civic Sewa Logo" className="navbar-logo" />
          <span className="navbar-title">Civic Sewa</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/feedback" className="nav-link">Feedback</Link>
        </div>
        <div className="navbar-actions">
          {isLoggedIn ? (
            <button onClick={handleLogoutClick} className="nav-button logout">Logout</button>
          ) : (
            <Link to="/auth" className="nav-button">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;