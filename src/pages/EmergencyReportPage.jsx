import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmergencyReportPageStyles = () => (
  <style>{`
    .page-container { max-width: 900px; margin: 2rem auto; padding: 0 1rem; }
    .page-header { text-align: center; margin-bottom: 2rem; }
    .page-title { font-size: 2.5rem; }
    .page-subtitle { font-size: 1.1rem; color: #6c757d; max-width: 600px; margin: 0.5rem auto 0; }
    .form-container { background: white; padding: 2rem 2.5rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
    .form-group { text-align: left; margin-bottom: 1.5rem; }
    .form-input, .form-select, textarea.form-input { width: 100%; padding: 0.75rem; border: 1px solid #dee2e6; border-radius: 8px; font-size: 1rem; background-color: #f8f9fa; font-family: 'Poppins', sans-serif; }
    textarea.form-input { resize: vertical; }
    .emergency-title { color: #dc3545; }
    .emergency-form-container { border: 2px solid #f8d7da; }
    .submit-emergency-btn { width: 100%; padding: 0.9rem; background-color: #dc3545; color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background-color 0.3s ease; margin-top: 1rem; }
    .submit-emergency-btn:hover { background-color: #b02a37; }
    .submit-emergency-btn:disabled { background-color: #e9ecef; cursor: not-allowed; }
    .emergency-card-container { text-align: center; }
    .emergency-card { background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden; border-left: 8px solid #dc3545; text-align: left; margin-top: 2rem; }
    .emergency-card .card-header { background-color: #dc3545; color: white; padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1rem; }
    .emergency-card .card-title { font-size: 1.5rem; margin: 0; }
    .emergency-card .card-body { padding: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem 1.5rem; }
    .emergency-card .card-item.full-width { grid-column: 1 / -1; }
    .emergency-card .card-item strong { display: block; color: #6c757d; margin-bottom: 0.3rem; font-size: 0.9rem; text-transform: uppercase; }
    .emergency-card .card-item span { font-size: 1.1rem; font-weight: 500; }
    .emergency-card .card-item p { font-size: 1rem; white-space: pre-wrap; background-color: #f8f9fa; padding: 10px; border-radius: 6px; margin: 0; }
    .submission-actions { display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; }
    .action-button { padding: 0.9rem 1.5rem; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
    .action-button.primary { background-color: #0d6efd; color: white; }
    .action-button.secondary { background-color: #6c757d; color: white; }
    @media (max-width: 768px) { .form-row, .emergency-card .card-body { grid-template-columns: 1fr; } }
  `}</style>
);

// UPDATED: This component now has a button to navigate back to the dashboard.
const EmergencyReportCard = ({ report, onReset }) => {
  const navigate = useNavigate();
  if (!report) return null;
  return (
    <div className="page-container emergency-card-container">
      <h2 className="page-title emergency-title">High Priority Alert Submitted!</h2>
      <div className="emergency-card">
        <div className="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          <h3 className="card-title">{report.disasterType} Alert</h3>
        </div>
        <div className="card-body">
          <div className="card-item"><strong>City/District:</strong> <span>{report.city}</span></div>
          <div className="card-item"><strong>Place/Village:</strong> <span>{report.placeName}</span></div>
          <div className="card-item full-width"><strong>Description:</strong> <p>{report.description}</p></div>
          <div className="card-item"><strong>Image:</strong> <span>{report.image}</span></div>
        </div>
      </div>
      <div className="submission-actions">
        <button onClick={() => navigate('/dashboard')} className="action-button secondary">
          Back to Dashboard
        </button>
        <button onClick={onReset} className="action-button primary">
          Report Another Emergency
        </button>
      </div>
    </div>
  );
};

const EmergencyReportPage = () => {
  const [formData, setFormData] = useState({ disasterType: '', placeName: '', city: 'Ahmedabad', description: '', image: null });
  const [submittedReport, setSubmittedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value, }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const reportData = { ...formData, image: formData.image?.name || 'No image uploaded' };
      setSubmittedReport(reportData);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleReset = () => {
    setSubmittedReport(null);
    setFormData({ disasterType: '', placeName: '', city: 'Ahmedabad', description: '', image: null });
  };

  if (submittedReport) {
    return <><EmergencyReportPageStyles /><EmergencyReportCard report={submittedReport} onReset={handleReset} /></>;
  }

  return (
    <div className="page-container">
      <EmergencyReportPageStyles />
      <div className="page-header">
        <h1 className="page-title emergency-title">Emergency Disaster Report</h1>
        <p className="page-subtitle">Use this form for major, high-priority incidents ONLY.</p>
      </div>
      <div className="form-container emergency-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group"><label>Type of Disaster</label><select name="disasterType" value={formData.disasterType} onChange={handleChange} className="form-select" required><option value="" disabled>-- Select Disaster --</option><option value="Cyclone">Cyclone</option><option value="Flood">Flood</option><option value="Tornado">Tornado</option><option value="Landslide">Landslide</option><option value="Heavy Rainfall">Heavy Rainfall</option></select></div>
            <div className="form-group"><label>City / District</label><select name="city" value={formData.city} onChange={handleChange} className="form-select" required><option value="Ahmedabad">Ahmedabad</option><option value="Surat">Surat</option><option value="Vadodara">Vadodara</option><option value="Rajkot">Rajkot</option><option value="Gandhinagar">Gandhinagar</option><option value="Kutch">Kutch</option><option value="Other">Village / Other</option></select></div>
          </div>
          <div className="form-group full-width"><label>Place / Village Name</label><input type="text" name="placeName" value={formData.placeName} onChange={handleChange} className="form-input" placeholder="e.g., Vasna village, Sanand Taluka" required /></div>
          <div className="form-group full-width"><label>Detailed Description</label><textarea name="description" value={formData.description} onChange={handleChange} className="form-input" rows="5" placeholder="Describe the situation in detail. What is happening? How many people are affected?" required></textarea></div>
          <div className="form-group full-width"><label>Upload Image (Optional)</label><input type="file" name="image" onChange={handleChange} className="form-input" accept="image/*" /></div>
          <button type="submit" className="submit-emergency-btn" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit Emergency Report'}</button>
        </form>
      </div>
    </div>
  );
};

export default EmergencyReportPage;