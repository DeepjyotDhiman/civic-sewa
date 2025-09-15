import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Registerpage.css";

// ✅ Success Notification (same as LoginPage)
const SuccessNotification = () => (
  <div className="success-banner">
    🎉 Account Created Successfully! Redirecting...
    <style>{`
      .success-banner {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #0d6efd;   /* 🔵 blue */
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

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowNotification(true);

      // ✅ Auto close after 2.5s and redirect
      setTimeout(() => {
        setShowNotification(false);
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      {showNotification && <SuccessNotification />} {/* ✅ Show popup */}

      <div className="auth-container">
        <h1 className="auth-title">Create Account</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
            />
          </div>
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
          <button type="submit" className="auth-submit-btn">Sign Up</button>
        </form>
        <p className="auth-toggle-text">
          Already have an account? <a href="/login" className="toggle-link">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

