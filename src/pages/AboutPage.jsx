import React from "react";
import { motion } from "framer-motion";
import {
  FiLayers,
  FiUsers,
  FiShield,
  FiTrendingUp,
  FiCheckCircle,
  FiGlobe
} from "react-icons/fi";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Hero Header */}
      <section className="relative py-24 border-b border-slate-800/80">
        <div className="absolute top-10 left-1/3 w-96 h-96 bg-teal-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-400"
          >
            <FiGlobe /> Transforming Civic Digital Infrastructure
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading text-white"
          >
            About <span className="gradient-text">CivicOS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed"
          >
            CivicOS is a next-generation civic engagement platform engineered to unify fragmented public complaint channels into an auditable, real-time dispatch ecosystem for modern municipal governance.
          </motion.p>
        </div>
      </section>

      {/* Vision & Impact */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center text-xl">
              <FiLayers />
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">Operational Telemetry Data</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              CivicOS treats civic issues as structured operational telemetry data rather than isolated user complaints. Each incident transitions through verifiable lifecycle stages: Intake, Department Routing, Field Work, and Photographic Proof Closure.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl">
              <FiTrendingUp />
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">Governance & Accountability</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              By introducing transparent SLAs, automated department dispatch, and live status dashboards, CivicOS rebuilds citizen trust, eliminates bureaucracy delays, and supplies city planners with actionable metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 border-t border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-bold font-heading text-white">Core Architectural Principles</h2>
            <p className="text-sm text-slate-400 mt-2">Built around accountability, operational clarity, and speed.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["Citizen First", "Effortless report filing, direct progress tracking, and instant notifications.", <FiUsers />],
              ["Authority Telemetry", "Command consoles designed for municipal department leads and rapid dispatchers.", <FiShield />],
              ["Auditability", "Transparent resolution trails preventing dropped complaints and unaccountable delays.", <FiCheckCircle />],
            ].map(([title, desc, icon]) => (
              <div key={title} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
                <div className="text-teal-400 text-xl">{icon}</div>
                <h3 className="text-lg font-bold font-heading text-white">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
