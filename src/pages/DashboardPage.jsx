import React from "react";
import { FiAlertCircle, FiClock, FiCheckCircle } from "react-icons/fi";

const DashboardPage = () => {
  const { reports } = useReports();

  return (
    <div className="bg-neutral-50 min-h-screen px-8 py-20">
      <h1 className="text-3xl font-semibold mb-10">Citizen Dashboard</h1>

      {reports.length === 0 && (
        <p className="text-neutral-600">No reports submitted yet.</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {reports.map((r) => (
          <div
            key={r.id}
            className={`rounded-xl border p-6 ${
              r.type === "Emergency"
                ? "border-red-300 bg-red-50"
                : "border-neutral-200 bg-white"
            }`}
          >
            <h3 className="font-medium">{r.title}</h3>
            <p className="text-sm text-neutral-600 mt-2">{r.description}</p>
            <p className="text-xs text-neutral-500 mt-4">
              Status: {r.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
