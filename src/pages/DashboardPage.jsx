import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiClock,
  FiCheckCircle,
  FiPlus,
  FiAlertOctagon,
  FiMapPin,
  FiFilter,
  FiSearch,
  FiActivity
} from "react-icons/fi";
import { useReports } from "../context/ReportsContext";

const DashboardPage = () => {
  const { reports } = useReports();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase());

    if (filter === "All") return matchesSearch;
    if (filter === "Emergency") return matchesSearch && r.type === "Emergency";
    if (filter === "In Progress") return matchesSearch && r.status === "In Progress";
    if (filter === "Resolved") return matchesSearch && r.status === "Resolved";
    return matchesSearch;
  });

  const stats = {
    total: reports.length,
    inProgress: reports.filter((r) => r.status === "In Progress" || r.status === "Submitted").length,
    critical: reports.filter((r) => r.type === "Emergency" || r.status === "Critical").length,
    resolved: reports.filter((r) => r.status === "Resolved").length,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-6 max-w-7xl mx-auto space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-400 mb-2">
            <FiActivity className="animate-pulse" /> Citizen Dispatch Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            My Incident Reports
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track real-time resolution updates from municipal authorities for your reported issues.
          </p>
        </div>

        {/* Action Trigger Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/report-issue"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-bold text-sm shadow-glow-teal hover:shadow-glow-emerald transition-all duration-200 flex items-center gap-2"
          >
            <FiPlus /> Report Issue
          </Link>
          <Link
            to="/report-emergency"
            className="px-5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-semibold text-sm transition-all flex items-center gap-2 shadow-glow-rose"
          >
            <FiAlertOctagon className="animate-pulse" /> Emergency Alert
          </Link>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Total Reports</span>
            <FiActivity className="text-teal-400" />
          </div>
          <p className="text-3xl font-extrabold font-heading text-white mt-2">{stats.total}</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Active / In Progress</span>
            <FiClock className="text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold font-heading text-white mt-2">{stats.inProgress}</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Emergency Alerts</span>
            <FiAlertOctagon className="text-rose-400" />
          </div>
          <p className="text-3xl font-extrabold font-heading text-white mt-2">{stats.critical}</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Resolved Cases</span>
            <FiCheckCircle className="text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold font-heading text-white mt-2">{stats.resolved}</p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            className="input pl-10 text-xs"
            placeholder="Search reports or areas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {["All", "In Progress", "Emergency", "Resolved"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                filter === t
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List Grid */}
      {filteredReports.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center border border-slate-800 space-y-3">
          <FiAlertTriangle className="mx-auto text-4xl text-slate-600" />
          <h3 className="text-lg font-bold text-slate-300">No Incidents Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You currently have no submitted reports matching your search or filter selection.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredReports.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className={`glass-card rounded-2xl p-6 border transition-all duration-300 space-y-4 ${
                r.type === "Emergency"
                  ? "border-rose-500/40 bg-rose-950/20 hover:border-rose-500/80 shadow-glow-rose"
                  : "border-slate-800 hover:border-teal-500/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${
                      r.type === "Emergency"
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        : "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                    }`}
                  >
                    {r.type === "Emergency" ? "🚨 Urgent Emergency" : `📌 Civic ${r.priority || "Standard"}`}
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading">{r.title}</h3>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                    r.status === "Critical"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse"
                      : r.status === "In Progress"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : r.status === "Resolved"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-300 border border-slate-700"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {r.status}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{r.description}</p>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 truncate max-w-[200px]">
                  <FiMapPin className="text-teal-400 shrink-0" />
                  {r.location}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
