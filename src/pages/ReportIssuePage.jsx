import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiSend,
  FiLoader,
  FiMapPin,
  FiUploadCloud,
  FiLayers,
  FiCheck,
  FiArrowLeft
} from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { useReports } from "../context/ReportsContext";

const CATEGORIES = [
  { id: "Roads", label: "Roads & Potholes", icon: "🚧" },
  { id: "Water", label: "Water & Drainage", icon: "💧" },
  { id: "Electricity", label: "Power & Lighting", icon: "⚡" },
  { id: "Sanitation", label: "Waste & Sanitation", icon: "🚮" },
  { id: "Other", label: "General Infrastructure", icon: "🏢" }
];

const ReportIssuePage = () => {
  const navigate = useNavigate();
  const { addReport } = useReports();

  const [form, setForm] = useState({
    title: "",
    category: "Roads",
    description: "",
    town: "Ranchi",
    area: "",
    priority: "Medium"
  });

  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      addReport({
        id: Date.now(),
        type: "Issue",
        title: form.title,
        description: form.description,
        location: `${form.area ? form.area + ", " : ""}${form.town}`,
        priority: form.priority,
        status: "Submitted",
        createdAt: new Date().toISOString(),
        department: form.category === "Roads" ? "Public Works Dept" : "Municipal Board"
      });

      setLoading(false);
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-teal-500/10 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl glass-card rounded-2xl border border-slate-800 shadow-2xl overflow-hidden relative z-10"
      >
        {/* Top Header */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xl">
              <FiAlertTriangle />
            </div>
            <div>
              <h1 className="text-xl font-bold font-heading text-white">Report Civic Issue</h1>
              <p className="text-xs text-slate-400">File a official municipal service ticket</p>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700"
          >
            <FiArrowLeft /> Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Category Selector Grid */}
          <div className="space-y-2">
            <label className="label">Select Infrastructure Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat.id })}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    form.category === cat.id
                      ? "bg-teal-500/15 border-teal-500/50 text-teal-300 shadow-sm"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-xs font-semibold">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Issue Title */}
          <div>
            <label className="label">Issue Title</label>
            <input
              name="title"
              className="input"
              placeholder="e.g. Deep Pothole outside Main Market Gate"
              required
              value={form.title}
              onChange={handleChange}
            />
          </div>

          {/* Detailed Description */}
          <div>
            <label className="label">Detailed Description</label>
            <textarea
              name="description"
              className="input"
              rows="4"
              placeholder="Provide exact details, street references, and hazards caused..."
              required
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Location Details */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">City / Municipal Ward</label>
              <select
                name="town"
                className="input"
                required
                value={form.town}
                onChange={handleChange}
              >
                <option value="Ranchi">Ranchi Municipal Corp</option>
                <option value="Dhanbad">Dhanbad District</option>
                <option value="Bokaro">Bokaro Steel City</option>
                <option value="Jamshedpur">Jamshedpur Ward</option>
              </select>
            </div>

            <div>
              <label className="label">Area / Landmark</label>
              <div className="relative">
                <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="area"
                  className="input pl-10"
                  placeholder="e.g. Sector 4 Market"
                  value={form.area}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Priority Pill Picker */}
          <div>
            <label className="label">Assessed Urgency Level</label>
            <div className="grid grid-cols-3 gap-2.5">
              {["Low", "Medium", "High"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setForm({ ...form, priority: p })}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    form.priority === p
                      ? p === "High"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                        : p === "Medium"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                        : "bg-teal-500/20 text-teal-300 border-teal-500/50"
                      : "bg-slate-900/60 border-slate-800 text-slate-400"
                  }`}
                >
                  {p} Priority
                </button>
              ))}
            </div>
          </div>

          {/* Photo Dropzone Mock */}
          <div>
            <label className="label">Attach Image Proof (Optional)</label>
            <label className="border-2 border-dashed border-slate-800 hover:border-teal-500/50 rounded-xl p-4 text-center cursor-pointer block bg-slate-900/40 transition-colors">
              <FiUploadCloud className="mx-auto text-2xl text-teal-400 mb-1" />
              <span className="text-xs text-slate-400">
                {fileName ? `File selected: ${fileName}` : "Click to upload photographic evidence (.jpg, .png)"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFileName(e.target.files[0]?.name || "")}
              />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-400 text-slate-950 font-bold py-3.5 rounded-xl shadow-glow-teal hover:shadow-glow-emerald transition-all duration-200 flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? <FiLoader className="animate-spin text-lg" /> : <FiSend />}
            <span>Dispatch Issue Ticket</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ReportIssuePage;
