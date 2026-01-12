import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

    // 🔹 Mock registration
    setTimeout(() => {
      onLogin(form.role);

      if (form.role === "authority") {
        navigate("/authority/dashboard");
      } else {
        navigate("/dashboard");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg p-8">

        <h1 className="text-2xl font-semibold text-slate-900 mb-6">
          Create Account
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-md px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-md px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-md px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Role Selector */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Register As
            </label>
            <div className="flex gap-2">
              {["citizen", "authority"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setForm({ ...form, role: r })}
                  className={`flex-1 px-4 py-2 rounded-md border text-sm transition
                    ${
                      form.role === r
                        ? "bg-slate-900 text-white border-slate-900"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-slate-900 text-white
                       hover:bg-slate-800 transition disabled:opacity-60"
          >
            {loading
              ? "Creating Account..."
              : `Register as ${form.role === "authority" ? "Authority" : "Citizen"}`}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-slate-900 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
