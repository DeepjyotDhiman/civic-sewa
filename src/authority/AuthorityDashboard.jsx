import React from "react";
import {
  FiAlertOctagon,
  FiClock,
  FiCheckCircle
} from "react-icons/fi";

const stats = [
  { label: "Active Emergencies", value: 0, icon: <FiAlertOctagon />, color: "text-red-400" },
  { label: "Submitted Issues", value: 0, icon: <FiClock />, color: "text-yellow-400" },
  { label: "Resolved Issues", value: 0, icon: <FiCheckCircle />, color: "text-green-400" }
];

const AuthorityDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-10">
        Authority Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-6"
          >
            <div className={`text-2xl ${s.color}`}>
              {s.icon}
            </div>
            <p className="mt-4 text-sm text-neutral-400">
              {s.label}
            </p>
            <p className="text-3xl font-semibold mt-1">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 bg-neutral-900 border border-neutral-800 rounded-xl p-8">
        <h2 className="text-xl font-semibold mb-3">
          System Status
        </h2>
        <p className="text-neutral-400 text-sm">
          Backend integration is not enabled yet.
          This dashboard currently displays UI-only metrics.
        </p>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
