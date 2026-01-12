import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

/* Layout */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* Public */
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Loginpage";
import RegisterPage from "./pages/Registerpage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import FeedbackPage from "./pages/FeedbackPage";

/* Citizen */
import DashboardPage from "./pages/DashboardPage";
import ReportIssuePage from "./pages/ReportIssuePage";
import EmergencyReportPage from "./pages/EmergencyReportPage";

/* Authority */
import AuthorityLayout from "./authority/AuthorityLayout";
import AuthorityDashboard from "./authority/AuthorityDashboard";
import AllIssuesPage from "./authority/AllIssuesPage";

/* ───────── Protected Route ───────── */

const ProtectedRoute = ({ isLoggedIn, role, allowedRole, children }) => {
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (allowedRole && role !== allowedRole) {
    return role === "authority"
      ? <Navigate to="/authority/dashboard" replace />
      : <Navigate to="/dashboard" replace />;
  }

  return children;
};

/* ───────── App Controller ───────── */

const AppController = () => {
  const location = useLocation();
  const isAuthorityRoute = location.pathname.startsWith("/authority");

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  useEffect(() => {
    if (isLoggedIn && role) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
    }
  }, [isLoggedIn, role]);

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <div className="min-h-screen flex flex-col">

      {!isAuthorityRoute && (
        <Navbar
          isLoggedIn={isLoggedIn}
          userRole={role}
          onLogout={handleLogout}
        />
      )}

      <main className="flex-1">
        <Routes>

          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />

          {/* Citizen */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRole="citizen">
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/report-issue"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRole="citizen">
                <ReportIssuePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/report-emergency"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRole="citizen">
                <EmergencyReportPage />
              </ProtectedRoute>
            }
          />

          {/* Authority */}
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

      {!isAuthorityRoute && <Footer />}
    </div>
  );
};

/* ───────── Root ───────── */

const App = () => (
  <Router>
    <AppController />
  </Router>
);

export default App;
