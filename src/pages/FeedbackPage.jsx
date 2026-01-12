import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMessageSquare,
  FiSend,
  FiCheckCircle
} from "react-icons/fi";

const FeedbackPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    category: "",
    message: "",
    email: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔌 API integration later
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex justify-center items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-neutral-200 rounded-2xl p-10 max-w-lg text-center"
        >
          <FiCheckCircle className="text-teal-600 mx-auto mb-4" size={36} />
          <h2 className="text-2xl font-semibold mb-2">
            Feedback Submitted
          </h2>
          <p className="text-neutral-600">
            Thank you for helping improve civic services.
            Your feedback contributes directly to better governance.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white border border-neutral-200 rounded-2xl overflow-hidden"
      >

        {/* Header */}
        <div className="bg-neutral-900 text-white px-10 py-8">
          <div className="flex items-center gap-3">
            <FiMessageSquare size={26} />
            <h1 className="text-2xl font-semibold">
              Citizen Feedback
            </h1>
          </div>
          <p className="text-neutral-300 mt-2 max-w-2xl">
            Share suggestions, concerns, or feedback to help authorities
            improve public services and platform effectiveness.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-10 py-12 space-y-8"
        >

          {/* Category */}
          <div>
            <label className="label">
              Feedback Category
            </label>
            <select
              name="category"
              required
              className="input"
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option>Service Quality</option>
              <option>Issue Resolution Delay</option>
              <option>Platform Experience</option>
              <option>Suggestion / Idea</option>
              <option>Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="label">
              Your Message
            </label>
            <textarea
              name="message"
              rows="5"
              required
              className="input"
              placeholder="Describe your feedback in detail..."
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">
              Email (optional)
            </label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="you@example.com"
              onChange={handleChange}
            />
            <p className="text-xs text-neutral-500 mt-1">
              Provide your email if you would like a response.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-neutral-900 text-white py-3 rounded-md
                       flex justify-center items-center gap-2
                       hover:bg-neutral-800 transition"
          >
            <FiSend />
            Submit Feedback
          </button>

        </form>
      </motion.div>
    </div>
  );
};

export default FeedbackPage;
