import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import './IssueModal.css'; // ✅ CSS is now imported

const departments = [
  "Sewage & Drainage",
  "Roads & Streets",
  "Forest Department",
  "Electricity Department",
  "Water Supply",
  "Waste Management"
];

const IssueModal = ({ issue, onClose }) => {
  const [newStatus, setNewStatus] = useState(issue.status || 'Submitted');
  const [assignedDept, setAssignedDept] = useState(issue.assignedTo || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    const collectionName = issue.type === 'Emergency' ? 'emergencies' : 'issues';
    const issueRef = doc(db, collectionName, issue.id);

    try {
      const updateLog = {
        text: `Status changed to ${newStatus} and assigned to ${assignedDept}.`,
        timestamp: new Date(),
      };
      
      await updateDoc(issueRef, { 
        status: newStatus,
        assignedTo: assignedDept,
        statusUpdates: arrayUnion(updateLog)
      });

      if (issue.userId) {
        await addDoc(collection(db, "notifications"), {
          userId: issue.userId,
          message: `Your issue "${issue.title || issue.disasterType}" has been updated to "${newStatus}".`,
          issueId: issue.id,
          isRead: false,
          createdAt: serverTimestamp(),
        });
      }

      alert('Issue updated successfully!');
      onClose();
    } catch (error) {
      console.error("Error updating status: ", error);
      alert('Failed to update status.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div 
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
        >
          <div className="modal-header">
            <h3>{issue.title || issue.disasterType}</h3>
            <button onClick={onClose} className="close-btn"><FiX /></button>
          </div>
          <div className="modal-body">
            <p><strong>Description:</strong> {issue.description}</p>
            <p><strong>Location:</strong> {issue.address?.village}, {issue.address?.town || issue.city}</p>
            {issue.imageUrl && (
              <div>
                <strong>Image Evidence:</strong>
                <img src={issue.imageUrl} alt="Issue evidence" className="modal-image"/>
              </div>
            )}
            
            {issue.type === 'Civic' && (
              <div className="status-update-section">
                <h4>Manage Issue</h4>
                <div className="form-grid-modal">
                  <div className="form-group-modal">
                    <label>Assign to Department</label>
                    <select value={assignedDept} onChange={(e) => setAssignedDept(e.target.value)}>
                      <option value="">-- Select Department --</option>
                      {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                  </div>
                  <div className="form-group-modal">
                    <label>Update Status</label>
                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                      <option value="Submitted">Submitted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>
                <button onClick={handleUpdate} disabled={isUpdating} className="update-btn">
                  {isUpdating ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IssueModal;