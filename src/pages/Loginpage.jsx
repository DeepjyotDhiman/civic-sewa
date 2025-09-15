import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Use Link for navigation
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // ✅ Import Firestore functions
import { auth, db } from "../firebase"; // ✅ Import db from firebase
import "./Loginpage.css";

// Success Notification (no changes)
const SuccessNotification = () => (
    <div className="success-banner">✅ Login Successful! Redirecting...</div>
);

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // ✅ Added loading state
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // Step 1: Authenticate user with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Step 2: Fetch user's role from Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                throw new Error("No user data found in database. Please contact support.");
            }

            const userData = userDoc.data();
            const userRole = userData.role; // This will be 'citizen' or 'authority'

            // Step 3: Update the main app state with the correct role
            onLogin(userRole);
            setShowNotification(true);

            // Step 4: Redirect to the correct dashboard based on the role
            setTimeout(() => {
                setShowNotification(false);
                if (userRole === 'authority') {
                    navigate("/authority/dashboard");
                } else {
                    navigate("/dashboard");
                }
            }, 2000); // 2-second delay for the notification

        } catch (err) {
            setError("Failed to login. Please check your email and password.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {showNotification && <SuccessNotification />}
            <div className="auth-container">
                {/* ✅ Changed title to be more generic */}
                <h1 className="auth-title">Portal Login</h1>
                {error && <p className="error-text">{error}</p>}
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
                    {/* ✅ Button is now disabled while loading */}
                    <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                        {isLoading ? "Signing In..." : "Login"}
                    </button>
                </form>
                <p className="auth-toggle-text">
                    Don’t have an account? <Link to="/register" className="toggle-link">Register</Link>
                </p>
            </div>
            {/* ✅ Added styles for success banner and error text directly here for simplicity */}
            <style>{`
                .success-banner {
                    position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
                    background: #28a745; color: white; padding: 12px 24px;
                    border-radius: 8px; font-weight: 600;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1000;
                    animation: fadeInOut 2.5s ease-in-out forwards;
                }
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0; transform: translate(-50%, -20px); }
                    10%, 90% { opacity: 1; transform: translate(-50%, 0); }
                }
                .error-text { color: #dc3545; font-weight: 500; margin-bottom: 15px; }
            `}</style>
        </div>
    );
};

export default LoginPage;