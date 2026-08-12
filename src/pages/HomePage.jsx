import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiAlertCircle,
  FiActivity,
  FiLayers,
  FiClock,
  FiShield,
  FiTrendingUp,
  FiCheckCircle,
  FiArrowRight,
  FiZap,
  FiRadio,
  FiMapPin
} from "react-icons/fi";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* ───────── HERO SECTION ───────── */}
      <section className="relative pt-20 pb-32 border-b border-slate-800/80">
        {/* Ambient Mesh Glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-teal-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Hero Content */}
          <motion.div variants={item} className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-400">
              <FiZap className="animate-pulse" />
              <span>Next-Gen Civic Governance Infrastructure</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] font-heading">
              Empowering Citizens, <br />
              <span className="gradient-text">Streamlining Cities.</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              CivicOS bridges the gap between citizens and municipal authorities. Report infrastructure faults, emergency hazards, and track resolution in real time.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                to="/register"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-400 text-slate-950 font-bold text-sm shadow-glow-teal hover:shadow-glow-emerald transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Get Started Now</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/report-emergency"
                className="px-6 py-3.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-semibold text-sm transition-all flex items-center gap-2 shadow-glow-rose"
              >
                <FiAlertCircle className="animate-bounce" />
                <span>Report Emergency</span>
              </Link>
            </div>

            {/* Quick Badges */}
            <div className="pt-6 border-t border-slate-800/80 flex items-center gap-6 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400" />
                <span>Zero Latency Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-teal-400" />
                <span>Transparent Audit Trail</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-cyan-400" />
                <span>Role-Based Dispatch</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual Component / Live Card */}
          <motion.div variants={item} className="lg:col-span-5">
            <div className="relative">
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-teal-500/30 to-cyan-500/30 blur-xl opacity-75 animate-pulse-slow" />

              <div className="relative glass-card rounded-2xl p-6 space-y-5 border border-slate-700/60 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <h3 className="font-heading font-bold text-base text-white">Live Incident Feed</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-1">
                    <FiRadio className="text-teal-400" /> Live Updates
                  </span>
                </div>

                {/* Simulated Feed Items */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 hover:border-teal-500/40 transition-colors">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 text-base">
                      <FiAlertCircle />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200">Main Road Pothole</span>
                        <span className="text-[10px] text-slate-500">2m ago</span>
                      </div>
                      <p className="text-xs text-slate-400 truncate flex items-center gap-1 mt-0.5">
                        <FiMapPin className="text-slate-500" /> Ranchi Municipal Sector 4
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 hover:border-emerald-500/40 transition-colors">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-base">
                      <FiCheckCircle />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200">Streetlight Failure Fixed</span>
                        <span className="text-[10px] text-slate-500">14m ago</span>
                      </div>
                      <p className="text-xs text-slate-400 truncate flex items-center gap-1 mt-0.5">
                        <FiMapPin className="text-slate-500" /> Civil Lines Ward 12
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/50 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 text-base animate-pulse">
                      <FiZap />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-300">Water Pipeline Hazard Alert</span>
                        <span className="text-[10px] text-rose-400/80">Just Now</span>
                      </div>
                      <p className="text-xs text-slate-400 truncate flex items-center gap-1 mt-0.5">
                        <FiMapPin className="text-slate-500" /> Emergency Dispatched
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    to="/dashboard"
                    className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1"
                  >
                    View All Active Citizen Reports <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ───────── METRICS SECTION ───────── */}
      <section className="py-20 relative">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            ["Active Reports", "54,290+", <FiAlertCircle className="text-teal-400" />],
            ["Avg. Resolution Time", "18.4 hrs", <FiClock className="text-cyan-400" />],
            ["Municipal Depts", "48 Active", <FiLayers className="text-emerald-400" />],
            ["Cities Onboarded", "120+ Hubs", <FiTrendingUp className="text-amber-400" />],
          ].map(([label, value, icon]) => (
            <motion.div
              key={label}
              variants={item}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-teal-500/50 shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <span className="text-lg">{icon}</span>
                <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
              </div>
              <p className="text-3xl font-extrabold font-heading text-white">{value}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ───────── CITIZEN EXPERIENCE WORKFLOW ───────── */}
      <section className="py-24 border-t border-slate-800/80 bg-slate-900/30">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 space-y-16"
        >
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">Simplified 3-Step Process</span>
            <h2 className="text-3xl font-bold font-heading">Empowering Citizen Action</h2>
            <p className="text-slate-400 text-sm">
              Our citizen-first design makes reporting issues effortless, transparent, and direct to the responsible authorities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["1. Snap & Report", "Upload photos, auto-tag geo-location, and submit issues in under 30 seconds.", <FiAlertCircle />],
              ["2. Live Telemetry", "Monitor live status changes from Submitted -> Under Review -> Dispatched.", <FiActivity />],
              ["3. Verified Resolution", "Receive photographic proof and confirmation once authorities resolve your complaint.", <FiCheckCircle />],
            ].map(([title, desc, icon]) => (
              <motion.div
                key={title}
                variants={item}
                whileHover={{ y: -8 }}
                className="glass-card rounded-2xl p-8 border border-slate-800 hover:border-teal-500/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                <h3 className="text-xl font-bold font-heading text-white mb-3">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───────── AUTHORITY CONSOLE PROMOTIONAL ───────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 blur-[160px] rounded-full pointer-events-none" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={item} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
              <FiShield /> Dedicated Municipal Command Console
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Data-Driven Authority Oversight & Dispatch
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed">
              Equip city officials and department leads with real-time incident mapping, automated priority ranking, department workload balancing, and transparent status logs.
            </p>

            <div className="pt-2">
              <Link
                to="/login"
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-teal-400 text-white text-sm font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>Access Authority Console</span>
                <FiArrowRight />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={item} className="glass-card rounded-2xl p-6 border border-slate-800 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Department Queue Status</span>
                <span className="text-xs text-emerald-400 font-mono">LIVE CONNECTED</span>
              </div>

              {[
                ["Roads & Public Infrastructure", "94% Resolved", "bg-emerald-500", "w-[94%]"],
                ["Water Sanitation & Drainage", "88% Resolved", "bg-teal-500", "w-[88%]"],
                ["Power & Electrical Grid", "91% Resolved", "bg-cyan-500", "w-[91%]"],
                ["Emergency Rapid Dispatch", "99% SLA Compliant", "bg-rose-500", "w-[99%]"],
              ].map(([name, stat, color, width]) => (
                <div key={name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{name}</span>
                    <span className="text-slate-400 font-mono">{stat}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className={`h-full rounded-full ${color} ${width}`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;