import React, { useState } from "react";
import IssueModal from "./IssueModal";
import { useReports } from "../context/ReportsContext";
import { FiSearch, FiFilter, FiEye, FiMapPin, FiClock, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const AllIssuesPage = () => {
  const { reports, updateReportStatus } = useReports();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = reports.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase());

    if (statusFilter === "All") return matchesSearch;
    return matchesSearch && r.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-white tracking-tight">
            Master Incident Queue
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time control log of citizen-submitted civic complaints and emergency alerts.
          </p>
        </div>
      </div>

      {/* Toolbar Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            className="input pl-10 text-xs"
            placeholder="Search by title, location or area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {["All", "Submitted", "In Progress", "Critical", "Resolved"].map((sf) => (
            <button
              key={sf}
              onClick={() => setStatusFilter(sf)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                statusFilter === sf
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {sf}
            </button>
          ))}
        </div>
      </div>

      {/* Master Data Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Incident Title</th>
                <th className="px-6 py-4">Category / Type</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-500">
                    No incident reports match your current filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/70 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white max-w-[240px] truncate">
                      {item.title}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          item.type === "Emergency"
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>

                    <td className="px-6 py-4 max-w-[180px] truncate text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <FiMapPin className="text-teal-400 shrink-0" />
                        {item.location}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`font-semibold ${
                          item.priority === "High" || item.priority === "Critical"
                            ? "text-rose-400"
                            : item.priority === "Medium"
                            ? "text-amber-400"
                            : "text-slate-400"
                        }`}
                      >
                        {item.priority || "Standard"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold inline-flex items-center gap-1.5 ${
                          item.status === "Critical"
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : item.status === "In Progress"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : item.status === "Resolved"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-300 border border-slate-700"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelected(item)}
                        className="px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 text-xs font-medium inline-flex items-center gap-1.5 transition-all"
                      >
                        <FiEye /> Inspect & Update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Inspection Modal */}
      {selected && (
        <IssueModal
          issue={selected}
          onClose={() => setSelected(null)}
          onUpdateStatus={(newStatus) => {
            updateReportStatus(selected.id, newStatus);
            setSelected(null);
          }}
        />
      )}
    </div>
  );
};

export default AllIssuesPage;
