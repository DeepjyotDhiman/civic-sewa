import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';
import { FiCheckCircle, FiAlertOctagon, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './AuthorityDashboard.css';

const StatCard = ({ icon, title, value, color }) => (
  <motion.div 
    className="stat-card" 
    style={{ borderLeftColor: color }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="stat-icon" style={{ backgroundColor: color }}>{icon}</div>
    <div className="stat-info">
      <h4>{value}</h4>
      <p>{title}</p>
    </div>
  </motion.div>
);

const AuthorityDashboard = () => {
  const [stats, setStats] = useState({ submitted: 0, inProgress: 0, resolved: 0, emergencies: 0 });

  useEffect(() => {
    // Listener for regular issues
    const issuesQuery = query(collection(db, "issues"));
    const unsubscribeIssues = onSnapshot(issuesQuery, (snapshot) => {
      let submitted = 0, inProgress = 0, resolved = 0;
      snapshot.forEach(doc => {
        const status = doc.data().status;
        if (status === 'Submitted') submitted++;
        else if (status === 'In Progress') inProgress++;
        else if (status === 'Resolved') resolved++;
      });
      setStats(prev => ({ ...prev, submitted, inProgress, resolved }));
    });

    // Listener for emergencies
    const emergenciesQuery = query(collection(db, "emergencies"));
    const unsubscribeEmergencies = onSnapshot(emergenciesQuery, (snapshot) => {
      setStats(prev => ({ ...prev, emergencies: snapshot.size }));
    });

    return () => {
      unsubscribeIssues();
      unsubscribeEmergencies();
    };
  }, []);

  return (
    <div className="authority-dashboard">
      <h1>Dashboard Overview</h1>
      <div className="stats-grid">
        <StatCard icon={<FiAlertOctagon />} title="Active Emergencies" value={stats.emergencies} color="#dc3545" />
        <StatCard icon={<FiClock />} title="New Submitted Issues" value={stats.submitted} color="#ffc107" />
        <StatCard icon={<FiCheckCircle />} title="Resolved Issues" value={stats.resolved} color="#198754" />
      </div>
      <div className="dashboard-content">
        <h2>Recent Activity</h2>
        <p>A list of recent high-priority issues will be displayed here. Go to the "All Issues" page to see details and update statuses.</p>
      </div>
    </div>
  );
};

export default AuthorityDashboard;