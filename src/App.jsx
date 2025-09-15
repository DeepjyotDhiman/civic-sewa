import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/Loginpage';       // NEW
import RegisterPage from './pages/Registerpage'; // NEW
import ReportIssuePage from './pages/ReportIssuePage';
import EmergencyReportPage from './pages/EmergencyReportPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FeedbackPage from './pages/FeedbackPage';

// CSS
import './App.css';

// Protected Route
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // redirect to login if not logged in
  }
  return children;
};

// Placeholder
const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '100px 40px', textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>This page is under construction.</p>
  </div>
);

const AppController = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <main className={isHomePage ? "main-content no-padding-top" : "main-content"}>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} /> {/* NEW */}
          <Route path="/register" element={<RegisterPage />} />                 {/* NEW */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />

          {/* --- PROTECTED ROUTES --- */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute isLoggedIn={isLoggedIn}><DashboardPage /></ProtectedRoute>}
          />
          <Route
            path="/report-issue"
            element={<ProtectedRoute isLoggedIn={isLoggedIn}><ReportIssuePage /></ProtectedRoute>}
          />
          <Route
            path="/report-emergency"
            element={<ProtectedRoute isLoggedIn={isLoggedIn}><EmergencyReportPage /></ProtectedRoute>}
          />

          {/* --- PLACEHOLDER ROUTE --- */}
          <Route path="/authority" element={<PlaceholderPage title="Authority Portal" />} />

          {/* --- CATCH ALL --- */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppController />
    </Router>
  );
}

export default App;
