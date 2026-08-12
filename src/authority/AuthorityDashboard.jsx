import React from "react";
import {
  FiAlertOctagon,
  FiClock,
  FiCheckCircle,
  FiActivity,
  FiTrendingUp,
  FiUsers,
  FiMapPin,
  FiArrowUpRight,
  FiLayers
} from "react-icons/fi";
import { useReports } from "../context/ReportsContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AuthorityDashboard = () => {
  const { reports } = useReports();

  const total = reports.length;
  const emergencies = reports.filter((r) => r.type === "Emergency" || r.status === "Critical").length;
  const pending = reports.filter((r) => r.status === "Submitted" || r.status === "In Progress").length;
  const resolved = reports.filter((r) => r.status === "Resolved").length;

  const urgentReports = reports.filter((r) => r.type === "Emergency" || r.priority === "High").slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-white tracking-tight">
            Municipal Operations Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time incident dispatch telemetry and municipal department workload distribution.
          </p>
        </div>

        <Link
          to="/authority/issues"
          className="px-4 py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-400 text-xs font-semibold flex items-center gap-2 self-start md:self-auto transition-all"
        >
          <span>View Master Queue ({total})</span>
          <FiArrowUpRight />
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3"
        >
          <div className="flex justify-between items-center text-xs font-semibold uppercase text-rose-400">
            <span>Critical Emergencies</span>
            <FiAlertOctagon className="text-lg animate-bounce" />
          </div>
          <p className="text-3xl font-extrabold font-heading text-white">{emergencies}</p>
          <span className="text-[10px] text-slate-500 block font-mono">Immediate SLA Response Required</span>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3"
        >
          <div className="flex justify-between items-center text-xs font-semibold uppercase text-amber-400">
            <span>Active Pending Queue</span>
            <FiClock className="text-lg" />
          </div>
          <p className="text-3xl font-extrabold font-heading text-white">{pending}</p>
          <span className="text-[10px] text-slate-500 block font-mono">Under Investigation & Field Work</span>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3"
        >
          <div className="flex justify-between items-center text-xs font-semibold uppercase text-emerald-400">
            <span>Resolved Cases</span>
            <FiCheckCircle className="text-lg" />
          </div>
          <p className="text-3xl font-extrabold font-heading text-white">{resolved}</p>
          <span className="text-[10px] text-slate-500 block font-mono">Verified Works Completed</span>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3"
        >
          <div className="flex justify-between items-center text-xs font-semibold uppercase text-teal-400">
            <span>Avg Response Speed</span>
            <FiTrendingUp className="text-lg" />
          </div>
          <p className="text-3xl font-extrabold font-heading text-white">18.4 <span className="text-sm font-sans font-normal text-slate-400">hrs</span></p>
          <span className="text-[10px] text-slate-500 block font-mono">14% Faster than Last Month</span>
        </motion.div>
      </div>

      {/* Main Grid: Urgent Alerts & Department Performance */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Priority Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-heading text-white flex items-center gap-2">
              <FiAlertOctagon className="text-rose-400" /> High-Priority Incident Feed
            </h2>
            <span className="text-xs text-slate-400">Live Auto-Sync</span>
          </div>

          <div className="space-y-3">
            {urgentReports.length === 0 ? (
              <div className="glass-card p-8 rounded-2xl text-center text-slate-500 text-xs">
                No high-priority alerts logged right now.
              </div>
            ) : (
              urgentReports.map((r) => (
                <div
                  key={r.id}
                  className="glass-card p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 flex items-start justify-between gap-4 transition-all"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                          r.type === "Emergency"
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {r.type}
                      </span>
                      <span className="text-xs font-semibold text-white truncate">{r.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{r.description}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <FiMapPin className="text-teal-400" /> {r.location}
                    </p>
                  </div>

                  <Link
                    to="/authority/issues"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-teal-500/50 shrink-0"
                  >
                    Inspect
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Department Workload Status */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-base font-bold font-heading text-white flex items-center gap-2">
            <FiLayers className="text-teal-400" /> Department Operational Capacity
          </h2>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-5">
            {[
              ["Public Works (PWD)", 82, "bg-teal-500"],
              ["Water & Sanitation", 65, "bg-cyan-500"],
              ["Power Board (Electrical)", 94, "bg-emerald-500"],
              ["Disaster Rapid Response", 100, "bg-rose-500"],
            ].map(([dept, val, color]) => (
              <div key={dept} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">{dept}</span>
                  <span className="font-mono text-slate-400">{val}% Active</span>
                </div>
                <div className="h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div className={`h-full rounded-full ${color} w-[${val}%]`} style={{ width: `${val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
