import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* About Column */}
        <div className="footer-column">
          <h3 className="footer-title">Civic Sewa</h3>
          <p>A platform for the citizens of Gujarat to report, track, and resolve civic issues collaboratively.</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>

        {/* Contact Column */}
        <div className="footer-column">
          <h3 className="footer-title">Contact Us</h3>
          <p><FaMapMarkerAlt /> Municipal Corporation Office, Ashram Road, Ahmedabad, Gujarat</p>
          <p><FaPhone /> +91 79 1234 5678</p>
          <p><FaEnvelope /> support@civicsewa.com</p>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Civic Sewa. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
