import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen"); // ✅ key change
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    // 🔹 Simulated auth (replace with backend later)
    setTimeout(() => {
      onLogin(role);

      if (role === "authority") {
        navigate("/authority/dashboard");
      } else {
        navigate("/dashboard");
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg p-8">

        <h1 className="text-2xl font-semibold text-slate-900 mb-6">
          Portal Login
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}

        {/* Role Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Login As
          </label>
          <div className="flex gap-2">
            {["citizen", "authority"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 px-4 py-2 rounded-md border text-sm transition
                  ${role === r
                    ? "bg-slate-900 text-white border-slate-900"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100"}`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-slate-300 rounded-md px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-slate-300 rounded-md px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-slate-900 text-white
                       hover:bg-slate-800 transition disabled:opacity-60"
          >
            {loading
              ? "Signing In..."
              : `Login as ${role === "authority" ? "Authority" : "Citizen"}`}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-slate-900 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
