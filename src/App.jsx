import React, { useState } from 'react';
// NEW: We must import 'useLocation' to detect the current page
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Import all necessary components and pages from their separate files
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ReportIssuePage from './pages/ReportIssuePage';
import EmergencyReportPage from './pages/EmergencyReportPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FeedbackPage from './pages/FeedbackPage';

// Import the required CSS files
import './App.css';

// This is a special component that "guards" our protected routes.
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // If the user isn't logged in, it redirects them to the login page.
    return <Navigate to="/auth" replace />;
  }
  // If they are logged in, it shows the page they requested.
  return children;
};

// A simple component for placeholder pages.
const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '100px 40px', textAlign: 'center' }}><h1>{title}</h1><p>This page is under construction.</p></div>
);


// This new "Controller" component contains the main logic.
// It needs to be inside the Router to use the useLocation hook.
const AppController = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // This hook gets the current URL path from the browser (e.g., '/', '/about', etc.)
  const location = useLocation();
  
  // This check is the key to the fix: it's true ONLY on the homepage.
  const isHomePage = location.pathname === '/';

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      {/* This is the fix for the layout issue.
        - If it's the homepage, we add the 'no-padding-top' class to remove the space.
        - On all other pages, we use the default 'main-content' class with padding.
      */}
      <main className={isHomePage ? "main-content no-padding-top" : "main-content"}>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          
          {/* --- PROTECTED (LOGGED-IN ONLY) ROUTES --- */}
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

          {/* A catch-all to redirect any unknown URL back to the homepage */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};


// The main App component's only job is to provide the Router context.
function App() {
  return (
    <Router>
      <AppController />
    </Router>
  );
}

export default App;