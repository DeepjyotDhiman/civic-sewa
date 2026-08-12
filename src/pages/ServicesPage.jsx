import React from "react";
import { motion } from "framer-motion";
import {
  FiAlertCircle,
  FiMap,
  FiActivity,
  FiClock,
  FiUsers,
  FiBarChart2,
  FiZap
} from "react-icons/fi";

const capabilities = [
  {
    title: "Structured Issue Intake",
    desc: "Categorized reporting with automated location tagging, priority ranking, and department mapping.",
    icon: <FiAlertCircle />
  },
  {
    title: "Geographic Incident Mapping",
    desc: "Real-time location-aware visualization of public infrastructure health across city wards.",
    icon: <FiMap />
  },
  {
    title: "Lifecycle Telemetry Tracking",
    desc: "Every complaint follows a transparent, auditable resolution path from Intake -> Dispatch -> Resolution.",
    icon: <FiActivity />
  },
  {
    title: "Time-Bound SLA Enforcement",
    desc: "Enforced response targets and automated escalation triggers for delayed tickets.",
    icon: <FiClock />
  },
  {
    title: "Citizen Feedback Loop",
    desc: "Direct two-way updates between citizens and field technicians upon case completion.",
    icon: <FiUsers />
  },
  {
    title: "Municipal Governance Analytics",
    desc: "Data insights and trend reports for budget allocation, city planning, and public audits.",
    icon: <FiBarChart2 />
  }
];

const CapabilitiesPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <section className="relative py-24 border-b border-slate-800/80">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-400">
            <FiZap /> System Capabilities & Module Suite
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading text-white">
            Engineered for <span className="gradient-text">Public Service Excellence</span>
          </h1>
          <p className="text-slate-400 text-base max-w-3xl leading-relaxed">
            CivicOS provides an enterprise-grade digital suite connecting municipal departments, dispatchers, and citizens seamlessly.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl p-8 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                {cap.icon}
              </div>
              <h3 className="text-lg font-bold font-heading text-white">{cap.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CapabilitiesPage;
