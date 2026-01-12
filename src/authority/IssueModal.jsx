import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const IssueModal = ({ issue, onClose }) => {
  const [status, setStatus] = useState(issue.status);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-lg p-6">

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {issue.title}
          </h3>
          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        <p className="text-sm text-neutral-400 mb-4">
          Town: {issue.town}
        </p>

        <div className="mb-6">
          <label className="text-sm block mb-2">
            Update Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2"
          >
            <option>Submitted</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-neutral-100 text-neutral-900 py-2 rounded-md
                     hover:bg-white transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default IssueModal;
