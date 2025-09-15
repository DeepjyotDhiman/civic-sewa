import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { db } from "../firebase"; 
import { collection, addDoc } from "firebase/firestore"; 

// This component contains all the specific styles for the Report Issue Page.
const ReportIssuePageStyles = () => (
  <style>{` ... your styles stay the same ... `}</style>
);

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

  const handleSubmit = async () => {
    if (!formData.priority) { 
      alert('Please select a priority level.'); 
      return; 
    }

    const issueData = { 
      ...formData, 
      image: formData.image?.name || 'No image uploaded',
      createdAt: new Date()
    };

    try {
      // Save to Firestore
      await addDoc(collection(db, "issues"), issueData);

      // Show confirmation card
      setSubmittedIssue(issueData);
    } catch (error) {
      console.error("Error saving issue: ", error);
      alert("Something went wrong while saving the issue.");
    }
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
