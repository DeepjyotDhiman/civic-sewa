import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiSend, FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const ReportIssuePage = () => {
  const navigate = useNavigate();
  const { addReport } = useReports();

  const [form, setForm] = useState({
    title: "",
    description: "",
    town: "",
    area: "",
    priority: "Medium"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    addReport({
      id: Date.now(),
      type: "Issue",
      title: form.title,
      description: form.description,
      location: `${form.area}, ${form.town}`,
      priority: form.priority,
      status: "Submitted",
      createdAt: new Date().toISOString()
    });

    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white border border-neutral-200 rounded-2xl overflow-hidden"
      >
        <div className="bg-neutral-900 text-white px-8 py-6 flex items-center gap-3">
          <FiAlertTriangle size={26} />
          <h1 className="text-xl font-semibold">Report Civic Issue</h1>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-10 space-y-6">
          <input name="title" className="input" placeholder="Title" required onChange={handleChange} />
          <textarea name="description" className="input" rows="4" placeholder="Description" required onChange={handleChange} />
          <select name="town" className="input" required onChange={handleChange}>
            <option value="">Select Town</option>
            <option>Ranchi</option>
            <option>Dhanbad</option>
            <option>Bokaro</option>
          </select>
          <input name="area" className="input" placeholder="Area / Village" onChange={handleChange} />

          <button className="w-full bg-neutral-900 text-white py-3 rounded-md flex justify-center gap-2">
            {loading ? <FiLoader className="animate-spin" /> : <FiSend />}
            Submit Issue
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ReportIssuePage;
