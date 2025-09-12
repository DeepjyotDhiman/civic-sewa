import React from 'react';

const AboutPageStyles = () => (
  <style>{`
    .page-container { max-width: 1100px; margin: 2rem auto; padding: 0 1rem; }
    .page-header { text-align: center; margin-bottom: 3rem; }
    .page-title { font-size: 2.8rem; color: #0d6efd; }
    .page-subtitle { font-size: 1.2rem; color: #6c757d; max-width: 700px; margin: 0.5rem auto 0; }
    .about-content { background: white; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .mission-statement { font-size: 1.2rem; line-height: 1.8; text-align: center; margin-bottom: 3rem; color: #212529; }
    .how-it-works-title { text-align: center; font-size: 2rem; color: #0d6efd; margin-bottom: 2rem; }
    .steps-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; text-align: center; }
    .step-card { padding: 1.5rem; }
    .step-icon { font-size: 3rem; margin-bottom: 1rem; color: #0d6efd; }
    .step-card h3 { font-size: 1.25rem; margin-bottom: 0.5rem; color: #212529; }
    .step-card p { color: #6c757d; line-height: 1.6; }
    @media (max-width: 768px) { .steps-container { grid-template-columns: 1fr; } }
  `}</style>
);

const AboutPage = () => {
  return (
    <div className="page-container">
      <AboutPageStyles />
      <div className="page-header">
        <h1 className="page-title">About Civic Sewa</h1>
        <p className="page-subtitle">Empowering citizens to build better communities through technology and collaboration.</p>
      </div>
      <div className="about-content">
        <p className="mission-statement">
          Our mission is to create a transparent and efficient channel between the citizens of Gujarat and their local governing bodies. We believe that by providing a simple platform to report, track, and resolve civic issues, we can foster a greater sense of accountability and community ownership.
        </p>
        <h2 className="how-it-works-title">How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">1</div>
            <h3>Report an Issue</h3>
            <p>See a problem like a pothole, garbage overflow, or a broken streetlight? Submit a report in minutes with our easy-to-use form.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">2</div>
            <h3>Track Progress</h3>
            <p>Your submitted issue is sent to the relevant municipal department. You can track its status in real-time on your citizen dashboard.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">3</div>
            <h3>See Resolution</h3>
            <p>Once the authorities resolve the issue, the status is updated. Your feedback helps improve our communities for everyone.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;