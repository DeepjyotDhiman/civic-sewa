import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // ✅ Use setDoc to specify user ID
import { auth, db } from "../firebase";
import "./Registerpage.css"; // We'll create this CSS file

const RegisterPage = ({ onLogin }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("citizen"); // ✅ State to manage selected role
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        setIsLoading(true);
        setError("");

        try {
            // Step 1: Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Step 2: Create a user document in Firestore with the user's UID as the document ID
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                fullName: fullName,
                email: email,
                role: role, // ✅ Save the selected role
            });

            // Step 3: Log the user into the app state
            onLogin(role);

            // Step 4: Redirect to the correct dashboard
            if (role === 'authority') {
                navigate("/authority/dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError("This email address is already in use.");
            } else {
                setError("Failed to create an account. Please try again.");
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Create an Account</h1>
                {error && <p className="error-text">{error}</p>}
                <form className="auth-form" onSubmit={handleSubmit}>
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

                    {/* ✅ Role Selector UI */}
                    <div className="form-group">
                        <label>Register as</label>
                        <div className="role-selector">
                            <button
                                type="button"
                                className={`role-btn ${role === 'citizen' ? 'active' : ''}`}
                                onClick={() => setRole('citizen')}
                            >
                                Citizen
                            </button>
                            <button
                                type="button"
                                className={`role-btn ${role === 'authority' ? 'active' : ''}`}
                                onClick={() => setRole('authority')}
                            >
                                Authority
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Register"}
                    </button>
                </form>
                <p className="auth-toggle-text">
                    Already have an account? <Link to="/login" className="toggle-link">Login</Link>
                </p>
                 {/* ✅ Added styles for error text */}
                <style>{`.error-text { color: #dc3545; font-weight: 500; margin-bottom: 15px; }`}</style>
            </div>
        </div>
    );
};

export default RegisterPage;