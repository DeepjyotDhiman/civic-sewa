import React, { useState } from "react";
import IssueModal from "./IssueModal";

const demoIssues = [
  {
    id: 1,
    type: "Emergency",
    title: "Flood in Lowland Area",
    town: "Ranchi",
    status: "Critical",
    date: "2026-01-10"
  },
  {
    id: 2,
    type: "Civic",
    title: "Broken Street Light",
    town: "Dhanbad",
    status: "Submitted",
    date: "2026-01-09"
  }
];

const AllIssuesPage = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">
        All Reported Issues
      </h1>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-800 text-neutral-300">
            <tr>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3">Town</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {demoIssues.map((i) => (
              <tr
                key={i.id}
                className="border-t border-neutral-800 hover:bg-neutral-800/60"
              >
                <td className="px-4 py-3">{i.type}</td>
                <td className="px-4 py-3">{i.title}</td>
                <td className="px-4 py-3 text-center">{i.town}</td>
                <td className="px-4 py-3 text-center">{i.status}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => setSelected(i)}
                    className="text-blue-400 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <IssueModal issue={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default AllIssuesPage;
