import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom'; // ✅ Use NavLink for active styles
import { FiMenu, FiX } from 'react-icons/fi';
import NotificationsBell from './NotificationsBell';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout, userRole }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Effect to handle navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          civic<span>sewa</span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" className="nav-link" onClick={closeMenu}>About</NavLink>
          <NavLink to="/services" className="nav-link" onClick={closeMenu}>Services</NavLink>

          <div className="navbar-actions">
            {isLoggedIn ? (
              <>
                <NavLink to="/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</NavLink>
                {/* ✅ Notification Bell integrated here */}
                <NotificationsBell userRole={userRole} />
                <button onClick={() => { onLogout(); closeMenu(); }} className="nav-button logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="nav-button outline" onClick={closeMenu}>Login</Link>
                <Link to="/auth" className="nav-button primary" onClick={closeMenu}>Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;