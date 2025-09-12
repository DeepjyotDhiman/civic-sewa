import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = ({ onLogin }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(); // Tell App.jsx the user is logged in
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">{isRegisterMode ? 'Create Account' : 'Citizen Login'}</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegisterMode && <div className="form-group"><label>Full Name</label><input className="form-input" required /></div>}
          <div className="form-group"><label>Email Address</label><input type="email" className="form-input" required /></div>
          <div className="form-group"><label>Password</label><input type="password" className="form-input" required /></div>
          <button type="submit" className="auth-submit-btn">{isRegisterMode ? 'Sign Up' : 'Login'}</button>
        </form>
        <p className="auth-toggle-text">
          {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsRegisterMode(!isRegisterMode)} className="toggle-link">
            {isRegisterMode ? ' Login' : ' Register'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;