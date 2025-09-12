import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPageStyles = () => (
  <style>{`
    .dashboard-container { max-width: 1400px; margin: 2rem auto; padding: 0 1rem; }
    .dashboard-header { text-align: center; margin-bottom: 2.5rem; }
    .dashboard-header h1 { font-size: 2.8rem; color: #0d6efd; }
    .dashboard-header p { font-size: 1.1rem; color: #6c757d; margin-top: 0.5rem; }
    .dashboard-actions { display: flex; justify-content: center; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap; }
    .action-btn { padding: 0.8rem 1.5rem; border: none; border-radius: 8px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; cursor: pointer; }
    .action-btn.primary { background-color: #0d6efd; color: white; }
    .action-btn.primary:hover { background-color: #0b5ed7; }
    .action-btn.emergency { background-color: #dc3545; color: white; }
    .action-btn.emergency:hover { background-color: #b02a37; }
    .issues-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem; }
    .issue-card-dash { background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); display: flex; flex-direction: column; }
    .issue-card-dash.emergency-border { border-left: 6px solid #dc3545; }
    .issue-card-dash .card-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-bottom: 1px solid #dee2e6; }
    .issue-card-dash .card-header h4 { margin: 0; color: #0d6efd; }
    .issue-card-dash .card-header span { font-size: 0.9rem; color: #6c757d; font-weight: 500; }
    .issue-card-dash .card-body { padding: 1.5rem; flex-grow: 1; }
    .issue-card-dash .card-body p { margin: 0; }
    .issue-card-dash .card-footer { padding: 1rem 1.5rem; border-top: 1px solid #dee2e6; background: #f8f9fa; text-align: right; }
    .priority-badge-dash { padding: 0.3rem 0.8rem; border-radius: 20px; color: white; font-weight: 500; font-size: 0.8rem; }
    .priority-badge-dash.high { background-color: #dc3545; }
    .priority-badge-dash.medium { background-color: #ffc107; color: #212529; }
    .priority-badge-dash.low { background-color: #198754; }
  `}</style>
);

// Sample data to simulate issues fetched from a database
const sampleIssues = [
  { id: 1, isEmergency: true, type: 'Flood', city: 'Surat', description: 'Heavy waterlogging near Adajan area, roads are blocked.' },
  { id: 2, isEmergency: false, type: 'Garbage', city: 'Ahmedabad', priority: 'High', description: 'Garbage bin overflowing for 3 days in Maninagar.' },
  { id: 3, isEmergency: false, type: 'Roads', city: 'Vadodara', priority: 'Medium', description: 'Large pothole causing traffic issues on Alkapuri road.' },
  { id: 4, isEmergency: true, type: 'Cyclone', city: 'Kutch', description: 'Strong winds reported near Mandvi beach area.' },
];

const IssueCard = ({ issue }) => {
  const cardClasses = issue.isEmergency ? "issue-card-dash emergency-border" : "issue-card-dash";
  const getPriorityClass = (priority) => `priority-badge-dash ${priority?.toLowerCase()}`;
  return (
    <div className={cardClasses}>
      <div className="card-header">
        <h4>{issue.type}</h4>
        <span>{issue.city}</span>
      </div>
      <div className="card-body">
        <p>{issue.description}</p>
      </div>
      {!issue.isEmergency && (
        <div className="card-footer">
          <span className={getPriorityClass(issue.priority)}>{issue.priority} Priority</span>
        </div>
      )}
    </div>
  );
};

const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container dashboard-container">
      <DashboardPageStyles />
      <div className="dashboard-header">
        <h1>Citizen Dashboard</h1>
        <p>View all reported issues below. You can report a new issue or a high-priority emergency.</p>
        <div className="dashboard-actions">
          <button onClick={() => navigate('/report-issue')} className="action-btn primary">Report New Issue</button>
          <button onClick={() => navigate('/report-emergency')} className="action-btn emergency">Report Emergency</button>
        </div>
      </div>
      <div className="issues-grid">
        {sampleIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;