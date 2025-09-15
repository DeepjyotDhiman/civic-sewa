import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Common Components & CSS
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FeedbackPage from './pages/FeedbackPage';

// Citizen Pages
import DashboardPage from './pages/DashboardPage';
import ReportIssuePage from './pages/ReportIssuePage';
import EmergencyReportPage from './pages/EmergencyReportPage';

// Authority Pages & Layout
import AuthorityLayout from './authority/AuthorityLayout';
import AuthorityDashboard from './authority/AuthorityDashboard';
import AllIssuesPage from './authority/AllIssuesPage';

const ProtectedRoute = ({ isLoggedIn, role, allowedRole, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (role !== allowedRole) {
    if (role === 'citizen') return <Navigate to="/dashboard" replace />;
    if (role === 'authority') return <Navigate to="/authority/dashboard" replace />;
    return <Navigate to="/" replace />;
  }
  return children;
};

const AppController = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
    }
  }, [isLoggedIn, role]);

  const isAuthorityPage = location.pathname.startsWith('/authority');

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <div className="app-container">
      {!isAuthorityPage && <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userRole={role} />}

      <main className="main-content">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          {/* ✅ CORRECTED: The root path now correctly points to HomePage */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />

          {/* --- CITIZEN PROTECTED ROUTES --- */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRole="citizen"><DashboardPage /></ProtectedRoute>}
          />
          <Route
            path="/report-issue"
            element={<ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRole="citizen"><ReportIssuePage /></ProtectedRoute>}
          />
          <Route
            path="/report-emergency"
            element={<ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRole="citizen"><EmergencyReportPage /></ProtectedRoute>}
          />

          {/* --- AUTHORITY PROTECTED ROUTES --- */}
          <Route 
            path="/authority" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRole="authority">
                <AuthorityLayout onLogout={handleLogout} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} /> 
            <Route path="dashboard" element={<AuthorityDashboard />} />
            <Route path="issues" element={<AllIssuesPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAuthorityPage && <Footer />}
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