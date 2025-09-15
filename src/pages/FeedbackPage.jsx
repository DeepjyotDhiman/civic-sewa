import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaRegCommentDots, FaCheckCircle } from "react-icons/fa";
import { MdSubject } from "react-icons/md";

const FeedbackPageStyles = () => (
  <style>{`
    .page-container {
      max-width: 850px;
      margin: 2rem auto;
      padding: 0 1rem;
      font-family: 'Poppins', sans-serif;
    }

    .page-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .page-title {
      font-size: 2.2rem;
      font-weight: 700;
      color: #0d6efd;
    }
    .page-subtitle {
      font-size: 1.1rem;
      color: #6c757d;
      max-width: 600px;
      margin: 0.5rem auto 0;
    }

    .form-container {
      background: white;
      padding: 2rem;
      border-radius: 14px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    }

    .form-group {
      text-align: left;
      margin-bottom: 1.5rem;
      position: relative;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-input, textarea.form-input {
      width: 100%;
      padding: 0.75rem 2.5rem 0.75rem 2.5rem;
      border: 1px solid #dee2e6;
      border-radius: 10px;
      font-size: 1rem;
      background-color: #f8f9fa;
    }
    textarea.form-input {
      resize: vertical;
      min-height: 120px;
    }
    .input-icon {
      position: absolute;
      left: 10px;
      top: 40px;
      color: #6c757d;
      font-size: 1.2rem;
    }

    .submit-btn {
      width: 100%;
      padding: 0.9rem;
      background-color: #0d6efd;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 1rem;
    }
    .submit-btn:hover {
      background-color: #0b5ed7;
      transform: translateY(-2px);
    }

    .success-message {
      text-align: center;
      padding: 2rem;
      background-color: #e7f3ff;
      border-left: 5px solid #0d6efd;
      color: #212529;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .success-message h3 {
      margin-bottom: 0.5rem;
      color: #0d6efd;
      font-size: 1.6rem;
    }

    .feedback-importance {
      margin-top: 3rem;
      padding: 2rem;
      border-radius: 14px;
      background: linear-gradient(135deg, #e9f3ff, #fefefe);
      text-align: center;
    }
    .feedback-importance h2 {
      font-size: 1.6rem;
      margin-bottom: 1rem;
      color: #0d6efd;
    }
    .feedback-importance p {
      font-size: 1rem;
      color: #495057;
      max-width: 650px;
      margin: 0 auto;
    }

    /* Responsive styles */
    @media (max-width: 768px) {
      .page-title {
        font-size: 1.8rem;
      }
      .page-subtitle {
        font-size: 1rem;
      }
      .form-container {
        padding: 1.5rem;
      }
      .feedback-importance {
        padding: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .page-title {
        font-size: 1.5rem;
      }
      .page-subtitle {
        font-size: 0.95rem;
      }
      .form-input {
        font-size: 0.9rem;
      }
      .submit-btn {
        font-size: 1rem;
      }
    }
  `}</style>
);

const FeedbackPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page-container">
        <FeedbackPageStyles />
        <motion.div
          className="success-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <FaCheckCircle size={50} color="#0d6efd" style={{ marginBottom: "1rem" }} />
          <h3>Thank You!</h3>
          <p>
            Your feedback has been submitted successfully. We appreciate you
            taking the time to help us improve.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <FeedbackPageStyles />

      {/* Header */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">Contact & Feedback</h1>
        <p className="page-subtitle">
          Have a suggestion or a question? We'd love to hear from you.
        </p>
      </motion.div>

      {/* Feedback Form */}
      <motion.div
        className="form-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <FaUser className="input-icon" />
            <input type="text" id="name" className="form-input" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <FaEnvelope className="input-icon" />
            <input type="email" id="email" className="form-input" required />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <MdSubject className="input-icon" />
            <input type="text" id="subject" className="form-input" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <FaRegCommentDots className="input-icon" />
            <textarea id="message" className="form-input" required></textarea>
          </div>

          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Feedback
          </motion.button>
        </form>
      </motion.div>

      {/* Why Feedback Matters */}
      <motion.div
        className="feedback-importance"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Why Feedback Matters</h2>
        <p>
          Feedback is the key to building better services and stronger
          communities. By sharing your thoughts, you help us improve our
          platform, solve issues faster, and create solutions that matter most
          to you. Every suggestion makes a difference.
        </p>
      </motion.div>
    </div>
  );
};

export default FeedbackPage;
