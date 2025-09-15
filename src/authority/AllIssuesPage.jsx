import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import IssueModal from './IssueModal'; // We will create this next
import { FiFilter } from 'react-icons/fi';
import './AllIssuesPage.css';

const townsInJharkhand = ["Ranchi", "Jamshedpur", "Dhanbad", "Hazaribagh", "Bokaro", /* ...add all towns */];

const AllIssuesPage = () => {
  const [allIssues, setAllIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filters, setFilters] = useState({ status: 'All', town: 'All' });

  useEffect(() => {
    const issuesQuery = query(collection(db, "issues"), orderBy("createdAt", "desc"));
    const emergenciesQuery = query(collection(db, "emergencies"), orderBy("createdAt", "desc"));

    const unsubIssues = onSnapshot(issuesQuery, snapshot => {
      const issuesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'Civic' }));
      updateAllIssues(issuesData, 'issues');
    });

    const unsubEmergencies = onSnapshot(emergenciesQuery, snapshot => {
      const emergenciesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'Emergency' }));
      updateAllIssues(emergenciesData, 'emergencies');
    });

    setLoading(false);
    return () => {
      unsubIssues();
      unsubEmergencies();
    };
  }, []);
  
  const issueSources = { issues: [], emergencies: [] };
  const updateAllIssues = (data, source) => {
    issueSources[source] = data;
    const combined = [...issueSources.issues, ...issueSources.emergencies]
      .sort((a, b) => b.createdAt - a.createdAt);
    setAllIssues(combined);
  };

  useEffect(() => {
    let tempIssues = [...allIssues];
    if (filters.status !== 'All') {
      tempIssues = tempIssues.filter(issue => issue.status === filters.status);
    }
    if (filters.town !== 'All') {
      tempIssues = tempIssues.filter(issue => (issue.address?.town || issue.city) === filters.town);
    }
    setFilteredIssues(tempIssues);
  }, [filters, allIssues]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const getStatusClass = (status) => {
    if (status === 'Resolved') return 'status-resolved';
    if (status === 'In Progress') return 'status-progress';
    return 'status-submitted';
  };

  return (
    <div className="all-issues-page">
      <h1>Manage All Reported Issues</h1>
      
      <div className="filter-bar">
        <div className="filter-group">
          <label>Filter by Status</label>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Filter by Town (Jharkhand)</label>
          <select name="town" value={filters.town} onChange={handleFilterChange}>
            <option value="All">All Towns</option>
            {townsInJharkhand.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="issues-table-container">
        {loading ? <p>Loading issues...</p> : (
          <table className="issues-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Title / Disaster</th>
                <th>Town</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map(issue => (
                <tr key={issue.id}>
                  <td>
                    <span className={`type-badge ${issue.type.toLowerCase()}`}>{issue.type}</span>
                  </td>
                  <td>{issue.title || issue.disasterType}</td>
                  <td>{issue.address?.town || issue.city}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(issue.status)}`}>{issue.status || 'N/A'}</span>
                  </td>
                  <td>{issue.createdAt ? new Date(issue.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <button className="action-btn-view" onClick={() => setSelectedIssue(issue)}>
                      View & Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {selectedIssue && (
        <IssueModal 
          issue={selectedIssue} 
          onClose={() => setSelectedIssue(null)} 
        />
      )}
    </div>
  );
};

export default AllIssuesPage;