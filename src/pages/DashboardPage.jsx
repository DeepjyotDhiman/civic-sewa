import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlusCircle, FiAlertOctagon } from 'react-icons/fi';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

// ✅ IssueCard Sub-Component now uses the 'styles' object from its parent
const IssueCard = ({ issue, styles }) => {
  const getStatusStyle = (status) => {
    if (status === 'Resolved') return styles.statusResolved;
    if (status === 'In Progress') return styles.statusProgress;
    return styles.statusSubmitted;
  };

  const isEmergency = issue.type === 'Emergency';

  return (
    <motion.div
      style={styles.issueCard}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div style={{ ...styles.cardHeader, ...(isEmergency && styles.cardHeaderEmergency) }}>
        <h4 style={{ ...styles.cardTitle, ...(isEmergency && styles.cardTitleEmergency) }}>
          {issue.title || issue.disasterType}
        </h4>
        {isEmergency && <FiAlertOctagon />}
      </div>
      <div style={styles.cardBody}>
        <p style={styles.cardText}>{issue.description?.substring(0, 100)}...</p>
        {issue.assignedTo && (
          <div style={styles.assignedToInfo}>
            <strong style={styles.assignedToInfoStrong}>Assigned to:</strong> {issue.assignedTo}
          </div>
        )}
        <div style={styles.cardMeta}>
          <span>{issue.address?.town || issue.city}</span>
          <span>{issue.createdAt ? new Date(issue.createdAt.seconds * 1000).toLocaleDateString() : '...'}</span>
        </div>
      </div>
      <div style={styles.cardFooter}>
        <span style={{ ...styles.statusBadge, ...getStatusStyle(issue.status) }}>
          {issue.status}
        </span>
      </div>
    </motion.div>
  );
};

// Main Dashboard Page Component
const DashboardPage = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const issueSources = { issues: [], emergencies: [] };

    const qIssues = query(collection(db, 'issues'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
    const qEmergencies = query(collection(db, 'emergencies'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
    
    const combineAndSet = () => {
      const combined = [...issueSources.issues, ...issueSources.emergencies]
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setIssues(combined);
      setLoading(false);
    };

    const unsubIssues = onSnapshot(qIssues, (snapshot) => {
      issueSources.issues = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'Civic' }));
      combineAndSet();
    });

    const unsubEmergencies = onSnapshot(qEmergencies, (snapshot) => {
      issueSources.emergencies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'Emergency' }));
      combineAndSet();
    });

    return () => {
      unsubIssues();
      unsubEmergencies();
    };
  }, [user]);

  // ✅ All styles are now defined in this object
  const styles = {
    dashboardContainer: { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' },
    dashboardHeader: { textAlign: 'center', marginBottom: '3rem' },
    headerTitle: { fontSize: '2.8rem', color: '#212529' },
    headerSubtitle: { fontSize: '1.1rem', color: '#6c757d', marginTop: '0.5rem' },
    dashboardActions: { marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' },
    btn: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.8rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', border: 'none', cursor: 'pointer' },
    btnPrimary: { backgroundColor: '#0d6efd', color: 'white' },
    btnDanger: { backgroundColor: '#dc3545', color: 'white' },
    issuesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' },
    issueCard: { background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', border: '1px solid #e9ecef' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid #e9ecef' },
    cardHeaderEmergency: { backgroundColor: '#f8d7da', color: '#721c24' },
    cardTitle: { margin: 0, color: '#0d6efd' },
    cardTitleEmergency: { color: '#721c24' },
    cardBody: { padding: '1.5rem', flexGrow: 1 },
    cardText: { margin: '0 0 1rem 0', color: '#495057' },
    cardMeta: { display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6c757d' },
    cardFooter: { padding: '1rem 1.5rem', borderTop: '1px solid #e9ecef', background: '#f8f9fa', textAlign: 'right' },
    statusBadge: { padding: '0.3rem 0.8rem', borderRadius: '20px', fontWeight: '600', fontSize: '0.8rem' },
    statusSubmitted: { backgroundColor: '#e9ecef', color: '#495057' },
    statusProgress: { backgroundColor: '#fff3cd', color: '#856404' },
    statusResolved: { backgroundColor: '#d1e7dd', color: '#0f5132' },
    noIssuesCard: { gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px' },
    assignedToInfo: { marginBottom: '1rem', backgroundColor: '#e7f0ff', color: '#0d6efd', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.9rem' },
    assignedToInfoStrong: { color: '#0b5ed7' }
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.dashboardHeader}>
        <h1 style={styles.headerTitle}>My Dashboard</h1>
        <p style={styles.headerSubtitle}>Here are all the issues you have reported. Track their status in real-time.</p>
        <div style={styles.dashboardActions}>
          <button onClick={() => navigate('/report-issue')} style={{...styles.btn, ...styles.btnPrimary}}>
            <FiPlusCircle /> Report New Issue
          </button>
          <button onClick={() => navigate('/report-emergency')} style={{...styles.btn, ...styles.btnDanger}}>
            <FiAlertOctagon /> Report Emergency
          </button>
        </div>
      </div>

      <div style={styles.issuesGrid}>
        {loading && <p>Loading your reports...</p>}
        {!loading && issues.length === 0 && (
          <div style={styles.noIssuesCard}>
            <h3>No issues reported yet.</h3>
            <p>Click on "Report New Issue" to get started.</p>
          </div>
        )}
        <AnimatePresence>
          {issues.map(issue => <IssueCard key={issue.id} issue={issue} styles={styles} />)}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardPage;