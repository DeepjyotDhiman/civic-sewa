import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiAlertOctagon, FiSend, FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const EmergencyReportPage = () => {
  const navigate = useNavigate();
  const { addReport } = useReports();

  const [form, setForm] = useState({
    type: "",
    city: "Ranchi",
    location: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    addReport({
      id: Date.now(),
      type: "Emergency",
      title: form.type,
      description: form.description,
      location: `${form.location}, ${form.city}`,
      priority: "High",
      status: "Critical",
      createdAt: new Date().toISOString()
    });

    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white border border-red-200 rounded-2xl overflow-hidden"
      >
        <div className="bg-red-600 text-white px-8 py-6 flex items-center gap-3">
          <FiAlertOctagon size={28} />
          <h1 className="text-xl font-semibold">Emergency Report</h1>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-10 space-y-6">
          <select name="type" className="input" required onChange={handleChange}>
            <option value="">Select Disaster</option>
            <option>Flood</option>
            <option>Fire</option>
            <option>Landslide</option>
          </select>
          <input name="location" className="input" placeholder="Exact Location" required onChange={handleChange} />
          <textarea name="description" className="input" rows="4" placeholder="Description" required onChange={handleChange} />

          <button className="w-full bg-red-600 text-white py-3 rounded-md flex justify-center gap-2">
            {loading ? <FiLoader className="animate-spin" /> : <FiSend />}
            Submit Emergency
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmergencyReportPage;
