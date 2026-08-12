import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiShield, FiLock, FiMail, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const RegisterPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "citizen",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      onLogin(form.role);

      if (form.role === "authority") {
        navigate("/authority/dashboard");
      } else {
        navigate("/dashboard");
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Background Ambient Glows */}
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
            <h1 className="text-2xl font-bold font-heading text-white">Create Your Account</h1>
            <p className="text-xs text-slate-400">Join CivicOS to engage with city governance</p>
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
            <label className="label">Register As</label>
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "citizen" })}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  form.role === "citizen"
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-glow-teal"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <FiUser /> Citizen
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "authority" })}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  form.role === "authority"
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
              <label className="label">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <FiUser />
                </div>
                <input
                  name="fullName"
                  type="text"
                  required
                  className="input pl-10"
                  placeholder="e.g. Alex Johnson"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <FiMail />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="input pl-10"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  required
                  className="input pl-10"
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-400 text-slate-950 font-bold text-sm shadow-glow-teal hover:shadow-glow-emerald transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create {form.role === "authority" ? "Authority" : "Citizen"} Account</span>
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Already registered?{" "}
              <Link to="/login" className="text-teal-400 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
