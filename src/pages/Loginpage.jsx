import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase";
import "./Loginpage.css";

// ✅ Success Notification (auto close)
const SuccessNotification = () => (
  <div className="success-banner">
    ✅ Login Successful! Redirecting...
    <style>{`
      .success-banner {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #194a87ff;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: fadeInOut 3s ease-in-out forwards;
      }
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -20px); }
        10% { opacity: 1; transform: translate(-50%, 0); }
        90% { opacity: 1; transform: translate(-50%, 0); }
        100% { opacity: 0; transform: translate(-50%, -20px); }
      }
    `}</style>
  </div>
);

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false); // ✅ New
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
      setShowNotification(true);

      // ✅ Auto close after 2.5s and redirect
      setTimeout(() => {
        setShowNotification(false);
        navigate("/dashboard");
      }, 2500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      {showNotification && <SuccessNotification />} {/* ✅ Show banner */}

      <div className="auth-container">
        <h1 className="auth-title">Citizen Login</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="auth-submit-btn">Login</button>
        </form>
        <p className="auth-toggle-text">
          Don’t have an account? <a href="/register" className="toggle-link">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;


