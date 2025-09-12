import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Column 1: About */}
          <div className="footer-column">
            <div className="footer-brand">
              <img src="/logo.png" alt="Civic Sewa Logo" className="footer-logo" />
              <h4>Civic Sewa</h4>
            </div>
            <p>
              A platform for the citizens of Gujarat to report, track, and resolve civic issues collaboratively.
            </p>
          </div>

          {/* Column 2: Contact Us */}
          <div className="footer-column">
            <h4>Contact Us</h4>
            <p>
              Municipal Corporation Office,<br />
              Ashram Road, Ahmedabad,<br />
              Gujarat, 380009
            </p>
            <p>
              <strong>Phone:</strong> +91 79 1234 5678
            </p>
          </div>

         
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Civic Sewa. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;