import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiStar,
  FiMail,
  FiHeart
} from "react-icons/fi";

const FeedbackPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [form, setForm] = useState({
    category: "",
    message: "",
    email: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] bg-slate-950 flex justify-center items-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card border border-teal-500/30 rounded-2xl p-10 max-w-md text-center space-y-4 shadow-glow-teal"
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto">
            <FiCheckCircle />
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">
            Feedback Transmitted
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Thank you for helping us improve public infrastructure workflows. Your feedback directly informs city planning decisions.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-teal-400 hover:text-teal-300"
          >
            Submit Additional Feedback
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen px-6 py-16 flex justify-center items-center relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-500/10 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl glass-card border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative z-10"
      >
        {/* Header */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-8 py-6 space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xl">
              <FiMessageSquare />
            </div>
            <h1 className="text-2xl font-bold font-heading text-white">
              Citizen Feedback & Experience
            </h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Share ratings, platform improvements, or municipal service concerns directly with governance administrators.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Star Rating Bar */}
          <div className="space-y-2">
            <label className="label">Rate Overall Platform & Response Service</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-3 rounded-xl border text-xl transition-all ${
                    rating >= star
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-400 shadow-sm"
                      : "bg-slate-900 border-slate-800 text-slate-600"
                  }`}
                >
                  <FiStar />
                </button>
              ))}
              <span className="text-xs text-amber-400 font-bold ml-2 font-mono">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="label">Feedback Category</label>
            <select
              name="category"
              required
              className="input"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Service Quality">Municipal Service Quality</option>
              <option value="Issue Resolution Delay">Resolution Speed & SLA</option>
              <option value="Platform Experience">App UX & Design Feedback</option>
              <option value="Suggestion / Idea">Policy / Feature Suggestion</option>
              <option value="Other">Other Query</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="label">Detailed Feedback</label>
            <textarea
              name="message"
              rows="4"
              required
              className="input"
              placeholder="Provide constructive feedback, suggestions or details..."
              value={form.message}
              onChange={handleChange}
            />
          </div>

          {/* Email Optional */}
          <div>
            <label className="label">Contact Email (Optional)</label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                name="email"
                type="email"
                className="input pl-10"
                placeholder="citizen@mail.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-400 text-slate-950 font-bold py-3.5 rounded-xl shadow-glow-teal hover:shadow-glow-emerald transition-all duration-200 flex justify-center items-center gap-2 text-sm"
          >
            <FiSend />
            <span>Transmit Citizen Feedback</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default FeedbackPage;
