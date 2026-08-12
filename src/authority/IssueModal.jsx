import React, { useState } from "react";
import { FiX, FiCheckCircle, FiClock, FiAlertTriangle, FiMapPin, FiShield, FiSend } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const IssueModal = ({ issue, onClose, onUpdateStatus }) => {
  const [status, setStatus] = useState(issue.status);
  const [department, setDepartment] = useState(issue.department || "Public Works Department");

  const handleSave = () => {
    if (onUpdateStatus) {
      onUpdateStatus(status);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="glass-card rounded-2xl border border-slate-800 w-full max-w-lg overflow-hidden shadow-2xl space-y-6 p-6"
        >
          {/* Modal Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span
                className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  issue.type === "Emergency"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    : "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                }`}
              >
                {issue.type} Incident #{issue.id}
              </span>
              <h3 className="text-lg font-bold font-heading text-white">{issue.title}</h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* Details Overview */}
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="label">Location & Landmark</span>
              <p className="text-slate-200 flex items-center gap-1.5 font-medium">
                <FiMapPin className="text-teal-400" />
                {issue.location}
              </p>
            </div>

            <div>
              <span className="label">Citizen Report Summary</span>
              <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                {issue.description}
              </p>
            </div>

            {/* Department Assignment */}
            <div>
              <label className="label">Assigned Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="input text-xs"
              >
                <option>Public Works Department (PWD)</option>
                <option>Water Sanitation & Drainage</option>
                <option>Electrical Power Grid Board</option>
                <option>Disaster Rapid Response Unit</option>
                <option>Municipal Police Dispatch</option>
              </select>
            </div>

            {/* Workflow Status Selector */}
            <div>
              <label className="label">Update Incident Lifecycle Status</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["Submitted", "In Progress", "Critical", "Resolved"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      status === s
                        ? s === "Resolved"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                          : s === "Critical"
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                          : "bg-teal-500/20 text-teal-300 border-teal-500/50"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-slate-800 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 text-xs font-bold shadow-glow-teal hover:shadow-glow-emerald transition-all flex items-center justify-center gap-1.5"
            >
              <FiSend />
              <span>Commit Status Update</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default IssueModal;
