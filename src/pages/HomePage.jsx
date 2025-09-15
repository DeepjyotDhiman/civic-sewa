import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaClipboardList, FaExclamationTriangle, FaChartLine } from "react-icons/fa";
import "./HomePage.css";

import jharkhandImage from "../assets/jharkhand.jpg"; // ✅ Import your local image

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section
        className="hero hero-jharkhand"
        style={{ backgroundImage: `url(${jharkhandImage})` }}
      >
        <div className="hero-overlay">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Jharkhand Civic Portal
            </motion.h1>

            <motion.p
              className="tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Empowering citizens to build a better Jharkhand
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Report Issues, Build Solutions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Join thousands of citizens across Jharkhand in reporting civic
              issues and emergencies. Your voice matters in building a safer,
              cleaner, and better state for everyone.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <Link to="/report-issue" className="btn report-btn">
                <FaClipboardList /> Report Civic Issue
              </Link>
              <Link to="/report-emergency" className="btn emergency-btn">
                <FaExclamationTriangle /> Report Emergency
              </Link>
            </motion.div>

            <motion.div
              className="track-btn"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <Link to="/dashboard" className="btn track-report-btn">
                <FaChartLine /> Track Your Report
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
