import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiAlertOctagon,
  FiSend,
  FiLoader,
  FiMapPin,
  FiPhoneCall,
  FiZap,
  FiArrowLeft
} from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { useReports } from "../context/ReportsContext";

const HAZARD_TYPES = [
  { id: "Flood", label: "Severe Flooding", icon: "🌊" },
  { id: "Fire", label: "Building / Wild Fire", icon: "🔥" },
  { id: "Landslide", label: "Landslide / Collapse", icon: "⛰️" },
  { id: "Electrical Hazard", label: "Power Line Down", icon: "⚡" },
  { id: "Gas Leak", label: "Chemical / Gas Leak", icon: "☣️" },
];

const EmergencyReportPage = () => {
  const navigate = useNavigate();
  const { addReport } = useReports();

  const [form, setForm] = useState({
    type: "Flood",
    city: "Ranchi",
    location: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      addReport({
        id: Date.now(),
        type: "Emergency",
        title: `🚨 Emergency: ${form.type}`,
        description: form.description,
        location: `${form.location}, ${form.city}`,
        priority: "High",
        status: "Critical",
        createdAt: new Date().toISOString(),
        department: "Disaster Rapid Response Unit"
      });

      setLoading(false);
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Emergency Ambient Red Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-600/15 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl glass-card rounded-2xl border border-rose-500/40 shadow-glow-rose overflow-hidden relative z-10"
      >
        {/* Urgent Header */}
        <div className="bg-rose-600 text-white px-8 py-5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <FiAlertOctagon className="text-3xl animate-bounce" />
            <div>
              <h1 className="text-xl font-bold font-heading">Urgent Emergency Alert Dispatch</h1>
              <p className="text-xs text-rose-100 font-medium">Direct priority routing to Emergency Response Teams</p>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="text-xs font-semibold text-rose-100 hover:text-white flex items-center gap-1 bg-rose-700/80 px-3 py-1.5 rounded-lg border border-rose-500"
          >
            <FiArrowLeft /> Cancel
          </Link>
        </div>

        {/* Rapid Contact Banner */}
        <div className="bg-rose-950/40 border-b border-rose-900/60 px-8 py-3.5 flex items-center justify-between text-xs text-rose-300">
          <span className="flex items-center gap-2 font-medium">
            <FiPhoneCall className="animate-pulse text-rose-400" />
            Life-Threatening Emergency? Dial 112 / 108 Immediately.
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
            24/7 ACTIVE
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Hazard Selection */}
          <div className="space-y-2">
            <label className="label text-rose-300">Emergency Hazard Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {HAZARD_TYPES.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setForm({ ...form, type: h.id })}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    form.type === h.id
                      ? "bg-rose-500/25 border-rose-500/70 text-rose-200 shadow-glow-rose font-bold"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span className="text-xl">{h.icon}</span>
                  <span className="text-xs">{h.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location details */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">City / Region</label>
              <select
                name="city"
                className="input"
                required
                value={form.city}
                onChange={handleChange}
              >
                <option value="Ranchi">Ranchi Metro</option>
                <option value="Dhanbad">Dhanbad Region</option>
                <option value="Bokaro">Bokaro Industrial Belt</option>
                <option value="Jamshedpur">Jamshedpur Metro</option>
              </select>
            </div>

            <div>
              <label className="label">Exact Street / GPS Landmark</label>
              <div className="relative">
                <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400" />
                <input
                  name="location"
                  className="input pl-10 border-rose-900/50 focus:ring-rose-500/50 focus:border-rose-500"
                  placeholder="e.g. Near Harmu River Bridge, Ward 14"
                  required
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="label">Critical Situation Summary</label>
            <textarea
              name="description"
              className="input border-rose-900/50 focus:ring-rose-500/50 focus:border-rose-500"
              rows="4"
              placeholder="Describe current danger level, trapped individuals, road blockage, or assistance needed..."
              required
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Emergency Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-600 via-red-500 to-rose-600 hover:from-rose-500 hover:to-red-600 text-white font-bold py-4 rounded-xl shadow-glow-rose transition-all duration-200 flex justify-center items-center gap-2 text-base disabled:opacity-50"
          >
            {loading ? <FiLoader className="animate-spin text-xl" /> : <FiZap className="animate-bounce" />}
            <span>Dispatch High-Priority SOS Alert</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmergencyReportPage;
