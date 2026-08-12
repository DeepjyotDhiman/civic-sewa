import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiShield, FiLock, FiMail, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      onLogin(role);
      if (role === "authority") {
        navigate("/authority/dashboard");
      } else {
        navigate("/dashboard");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Background Lights */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-teal-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card rounded-2xl p-8 border border-slate-800 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 font-bold text-xl shadow-glow-teal mb-1">
              C
            </div>
            <h1 className="text-2xl font-bold font-heading text-white">Welcome Back</h1>
            <p className="text-xs text-slate-400">Sign in to access your CivicOS portal</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Role Segment Switcher */}
          <div className="space-y-1.5">
            <label className="label">Portal Role</label>
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setRole("citizen")}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  role === "citizen"
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-glow-teal"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <FiUser /> Citizen Portal
              </button>
              <button
                type="button"
                onClick={() => setRole("authority")}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  role === "authority"
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <FiShield /> Authority
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <FiMail />
                </div>
                <input
                  type="email"
                  className="input pl-10"
                  placeholder="name@city.gov or citizen@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <FiLock />
                </div>
                <input
                  type="password"
                  className="input pl-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-400 text-slate-950 font-bold text-sm shadow-glow-teal hover:shadow-glow-emerald transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as {role === "authority" ? "Authority Console" : "Citizen Portal"}</span>
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Don’t have an account yet?{" "}
              <Link to="/register" className="text-teal-400 font-semibold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
