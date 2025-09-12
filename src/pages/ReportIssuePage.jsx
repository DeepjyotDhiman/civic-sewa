import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// This component contains all the specific styles for the Report Issue Page.
const ReportIssuePageStyles = () => (
  <style>{`
    .page-container { max-width: 900px; margin: 2rem auto; padding: 0 1rem; }
    .page-header { text-align: center; margin-bottom: 2rem; }
    .page-title { font-size: 2.5rem; color: #0d6efd; }
    .page-subtitle { font-size: 1.1rem; color: #6c757d; max-width: 600px; margin: 0.5rem auto 0; }
    .form-container { background: white; padding: 2rem 2.5rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .form-step-header { text-align: center; margin-bottom: 2rem; color: #6c757d; }
    .form-step-header h3 { color: #212529; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
    .form-group { text-align: left; }
    .form-group.full-width { grid-column: 1 / -1; margin-bottom: 1.5rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
    .form-input, .form-select, textarea.form-input { width: 100%; padding: 0.75rem; border: 1px solid #dee2e6; border-radius: 8px; font-size: 1rem; background-color: #f8f9fa; font-family: 'Poppins', sans-serif; }
    textarea.form-input { resize: vertical; min-height: 80px; }
    .priority-group { display: flex; gap: 1rem; align-items: center; padding-top: 0.5rem; }
    .priority-btn { padding: 0.6rem 1.2rem; border: 1px solid #dee2e6; border-radius: 20px; cursor: pointer; background: #fff; transition: all 0.2s ease-in-out; font-weight: 500; }
    .priority-btn.selected { color: white; transform: scale(1.05); font-weight: 600; }
    .priority-btn.high.selected { background: #dc3545; border-color: #dc3545; }
    .priority-btn.medium.selected { background: #ffc107; border-color: #ffc107; color: #212529; }
    .priority-btn.low.selected { background: #198754; border-color: #198754; }
    .form-navigation { display: flex; justify-content: space-between; margin-top: 2rem; border-top: 1px solid #dee2e6; padding-top: 1.5rem; }
    .nav-form-btn { padding: 0.8rem 2rem; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
    .nav-form-btn.primary { background-color: #0d6efd; color: white; }
    .nav-form-btn.primary:hover { background-color: #0b5ed7; }
    .nav-form-btn.secondary { background-color: #f8f9fa; color: #212529; border: 1px solid #dee2e6; }
    .nav-form-btn:disabled { background-color: #e9ecef; cursor: not-allowed; color: #6c757d; }
    .submitted-card-container { max-width: 900px; margin: 2rem auto; padding: 0 1rem; text-align: center; }
    .submitted-title { color: #0d6efd; margin-bottom: 1.5rem; }
    .issue-card { background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden; text-align: left; }
    .issue-card .card-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; background: #f8f9fa; border-bottom: 1px solid #dee2e6; }
    .issue-card .card-title { font-size: 1.5rem; margin: 0; color: #212529; }
    .issue-card .card-body { padding: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .issue-card .card-item strong { display: block; color: #6c757d; margin-bottom: 0.3rem; font-size: 0.9rem; text-transform: uppercase; }
    .issue-card .card-item span { font-size: 1.1rem; font-weight: 500; }
    .issue-card .card-item p { margin: 0; white-space: pre-wrap; }
    .priority-badge { padding: 0.4rem 1rem; border-radius: 20px; color: white; font-weight: 600; font-size: 1rem; }
    .priority-badge.high { background: #dc3545; }
    .priority-badge.medium { background: #ffc107; color: #212529; }
    .priority-badge.low { background: #198754; }
    .submission-actions { display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; }
    .action-button { padding: 0.9rem 1.5rem; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
    .action-button.primary { background-color: #0d6efd; color: white; }
    .action-button.secondary { background-color: #6c757d; color: white; }
    @media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } .issue-card .card-body { grid-template-columns: 1fr; } }
  `}</style>
);

// UPDATED: This component now has a button to navigate back to the dashboard.
const IssueCard = ({ issue, onReset }) => {
  const navigate = useNavigate();
  if (!issue) return null;
  const getPriorityClass = (priority) => `priority-badge ${priority?.toLowerCase()}`;
  return (
    <div className="submitted-card-container">
      <h2 className="submitted-title">Issue Reported Successfully!</h2>
      <div className="issue-card">
        <div className="card-header">
          <h3 className="card-title">{issue.issueName}</h3>
          <span className={getPriorityClass(issue.priority)}>{issue.priority}</span>
        </div>
        <div className="card-body">
          <div className="card-item"><strong>Type:</strong> <span>{issue.issueType}</span></div>
          <div className="card-item"><strong>City:</strong> <span>{issue.city}</span></div>
          <div className="card-item full-width"><strong>Address:</strong> <p>{issue.address}</p></div>
          <div className="card-item"><strong>Image:</strong> <span>{issue.image}</span></div>
        </div>
      </div>
      <div className="submission-actions">
        <button onClick={() => navigate('/dashboard')} className="action-button secondary">
          Back to Dashboard
        </button>
        <button onClick={onReset} className="action-button primary">
          Report Another Issue
        </button>
      </div>
    </div>
  );
};

const ReportIssuePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ issueName: '', issueType: '', priority: '', city: 'Ahmedabad', address: '', image: null });
  const [submittedIssue, setSubmittedIssue] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };
  
  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = () => {
    if (!formData.priority) { alert('Please select a priority level.'); return; }
    const issueData = { ...formData, image: formData.image?.name || 'No image uploaded' };
    setSubmittedIssue(issueData);
  };

  const handleReset = () => {
    setSubmittedIssue(null);
    setCurrentStep(1);
    setFormData({ issueName: '', issueType: '', priority: '', city: 'Ahmedabad', address: '', image: null });
  };
  
  if (submittedIssue) {
    return <><ReportIssuePageStyles /><IssueCard issue={submittedIssue} onReset={handleReset} /></>;
  }

  return (
    <div className="page-container">
      <ReportIssuePageStyles />
      <div className="page-header">
        <h1 className="page-title">Report a Civic Issue</h1>
        <p className="page-subtitle">Please provide details for the non-emergency issue below.</p>
      </div>
      <div className="form-container">
        <div className="form-step-header"><h3>Step {currentStep} of 2</h3></div>
        {currentStep === 1 && (
          <>
            <div className="form-group full-width"><label>Name of Issue</label><input type="text" name="issueName" value={formData.issueName} onChange={handleChange} className="form-input" placeholder="e.g., Large pothole on C.G. Road" required /></div>
            <div className="form-row">
              <div className="form-group"><label>Type of Issue</label><select name="issueType" value={formData.issueType} onChange={handleChange} className="form-select" required><option value="" disabled>-- Select a category --</option><option value="Streets">Streets</option><option value="Roads">Roads</option><option value="Electricity">Electricity</option><option value="Sewage">Sewage</option><option value="Forest">Forest</option><option value="Garbage">Garbage</option></select></div>
              <div className="form-group"><label>Priority Level</label><div className="priority-group"><div onClick={() => setFormData({...formData, priority: 'High'})} className={`priority-btn high ${formData.priority === 'High' ? 'selected' : ''}`}>High</div><div onClick={() => setFormData({...formData, priority: 'Medium'})} className={`priority-btn medium ${formData.priority === 'Medium' ? 'selected' : ''}`}>Medium</div><div onClick={() => setFormData({...formData, priority: 'Low'})} className={`priority-btn low ${formData.priority === 'Low' ? 'selected' : ''}`}>Low</div></div></div>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className="form-row">
              <div className="form-group"><label>City / District</label><select name="city" value={formData.city} onChange={handleChange} className="form-select" required><option value="Ahmedabad">Ahmedabad</option><option value="Surat">Surat</option><option value="Vadodara">Vadodara</option><option value="Rajkot">Rajkot</option><option value="Gandhinagar">Gandhinagar</option><option value="Other">Village / Other</option></select></div>
              <div className="form-group"><label>Village / Location Details</label><textarea name="address" value={formData.address} onChange={handleChange} className="form-input" rows="3" placeholder="e.g., Near Law Garden, Ellisbridge" required></textarea></div>
            </div>
            <div className="form-group full-width"><label>Upload Image (Optional)</label><input type="file" name="image" onChange={handleChange} className="form-input" accept="image/*" /></div>
          </>
        )}
        <div className="form-navigation">
          <button onClick={prevStep} disabled={currentStep === 1} className="nav-form-btn secondary">Previous</button>
          {currentStep < 2 ? ( <button onClick={nextStep} className="nav-form-btn primary">Next</button> ) : ( <button onClick={handleSubmit} className="nav-form-btn primary">Submit Issue</button> )}
        </div>
      </div>
    </div>
  );
};

export default ReportIssuePage;