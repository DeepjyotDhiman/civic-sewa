import React, { useState } from 'react';

const FeedbackPageStyles = () => (
  <style>{`
    .page-container { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
    .page-header { text-align: center; margin-bottom: 2rem; }
    .page-title { font-size: 2.8rem; color: #0d6efd; }
    .page-subtitle { font-size: 1.2rem; color: #6c757d; max-width: 600px; margin: 0.5rem auto 0; }
    .form-container { background: white; padding: 2rem 2.5rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .form-group { text-align: left; margin-bottom: 1.5rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
    .form-input, textarea.form-input { width: 100%; padding: 0.75rem; border: 1px solid #dee2e6; border-radius: 8px; font-size: 1rem; background-color: #f8f9fa; font-family: 'Poppins', sans-serif; }
    textarea.form-input { resize: vertical; min-height: 120px; }
    .submit-btn { width: 100%; padding: 0.9rem; background-color: #0d6efd; color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background-color 0.3s ease; margin-top: 1rem; }
    .submit-btn:hover { background-color: #0b5ed7; }
    .success-message { text-align: center; padding: 2rem; background-color: #e7f3ff; border-left: 5px solid #0d6efd; color: #212529; border-radius: 8px; }
    .success-message h3 { margin-bottom: 0.5rem; }
  `}</style>
);

const FeedbackPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real app, this is where you would send the form data to a server.
    // For this demo, we will just show a success message.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page-container">
        <FeedbackPageStyles />
        <div className="success-message">
          <h3>Thank You!</h3>
          <p>Your feedback has been submitted successfully. We appreciate you taking the time to help us improve.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <FeedbackPageStyles />
      <div className="page-header">
        <h1 className="page-title">Contact & Feedback</h1>
        <p className="page-subtitle">Have a suggestion or a question? We'd love to hear from you.</p>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label htmlFor="name">Your Name</label><input type="text" id="name" className="form-input" required /></div>
          <div className="form-group"><label htmlFor="email">Your Email</label><input type="email" id="email" className="form-input" required /></div>
          <div className="form-group"><label htmlFor="subject">Subject</label><input type="text" id="subject" className="form-input" required /></div>
          <div className="form-group"><label htmlFor="message">Message</label><textarea id="message" className="form-input" required></textarea></div>
          <button type="submit" className="submit-btn">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;