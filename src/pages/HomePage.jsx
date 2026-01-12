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
  FiCheckCircle
} from "react-icons/fi";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 }
  }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HomePage = () => {
  return (
    <div className="bg-neutral-50 text-neutral-900">

      {/* ───────────── PLATFORM CONTEXT ───────────── */}
      <section className="border-b border-neutral-200">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto px-8 py-28 grid lg:grid-cols-2 gap-20"
        >
          {/* Narrative */}
          <motion.div variants={item}>
            <span className="text-xs uppercase tracking-widest text-neutral-500">
              Civic Digital Infrastructure
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight">
              A Unified System for
              <span className="block text-teal-600">Civic Coordination</span>
            </h1>

            <p className="mt-8 text-lg text-neutral-600 leading-relaxed">
              CivicOS is a modern coordination layer that connects citizens and
              authorities through structured workflows for reporting, tracking,
              and resolving public issues.
            </p>

            <div className="mt-12 flex gap-4">
              <Link
                to="/login"
                className="px-6 py-3 rounded-md bg-neutral-900 text-white
                           hover:bg-neutral-800 transition"
              >
                Citizen Access
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-md border border-neutral-300
                           hover:bg-neutral-100 transition"
              >
                Authority Login
              </Link>
            </div>
          </motion.div>

          {/* Metrics */}
          <motion.div
            variants={container}
            className="grid grid-cols-2 gap-6"
          >
            {[
              ["Active Reports", "54,000+", <FiAlertCircle />],
              ["Avg Resolution Time", "30 hrs", <FiClock />],
              ["Departments Integrated", "45+", <FiLayers />],
              ["Cities Covered", "120+", <FiTrendingUp />],
            ].map(([label, value, icon]) => (
              <motion.div
                key={label}
                variants={item}
                className="bg-white border border-neutral-200 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 text-neutral-500">
                  {icon}
                  <span className="text-xs uppercase tracking-wide">
                    {label}
                  </span>
                </div>
                <p className="mt-3 text-3xl font-medium text-neutral-900">
                  {value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ───────────── PROBLEM → SYSTEM RESPONSE ───────────── */}
      <section className="bg-white border-b border-neutral-200">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16"
        >
          <motion.div variants={item}>
            <h2 className="text-2xl font-medium mb-4 flex items-center gap-3">
              <FiActivity /> The Civic Challenge
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Civic complaints today are fragmented, slow, and opaque. Citizens
              lack visibility, and authorities lack structured prioritization.
            </p>
          </motion.div>

          <motion.div variants={item}>
            <h2 className="text-2xl font-medium mb-4 flex items-center gap-3">
              <FiLayers /> The CivicOS Response
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              CivicOS introduces a unified lifecycle — intake, assignment,
              resolution, and closure — shared across citizens and authorities.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ───────────── CITIZEN EXPERIENCE ───────────── */}
      <section className="bg-neutral-50">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-8 py-24"
        >
          <motion.h2
            variants={item}
            className="text-2xl font-medium mb-12 flex items-center gap-3"
          >
            <FiUsers /> Citizen Experience
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["Report", "Structured issue reporting with category and location.", <FiAlertCircle />],
              ["Track", "Real-time visibility into assignment and progress.", <FiActivity />],
              ["Engage", "Updates, feedback, and transparent closure.", <FiCheckCircle />],
            ].map(([title, desc, icon]) => (
              <motion.div
                key={title}
                variants={item}
                whileHover={{ y: -4 }}
                className="bg-white border border-neutral-200 rounded-xl p-6"
              >
                <div className="text-teal-600 mb-4">{icon}</div>
                <h3 className="font-medium mb-2">{title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───────────── AUTHORITY OPERATIONS ───────────── */}
      <section className="bg-neutral-950 text-neutral-100">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-8 py-24"
        >
          <motion.h2
            variants={item}
            className="text-2xl font-medium mb-12 flex items-center gap-3"
          >
            <FiShield /> Authority Operations
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["Central Intake", "Unified dashboard for all civic issues.", <FiLayers />],
              ["Prioritization", "Severity-based assignment and escalation.", <FiTrendingUp />],
              ["Resolution Tracking", "Measured timelines and accountability.", <FiClock />],
            ].map(([title, desc, icon]) => (
              <motion.div
                key={title}
                variants={item}
                whileHover={{ y: -4 }}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6"
              >
                <div className="text-teal-500 mb-4">{icon}</div>
                <h3 className="font-medium mb-2">{title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───────────── TRUST & GOVERNANCE ───────────── */}
      <section className="bg-white">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-8 py-24"
        >
          <motion.h2
            variants={item}
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <FiShield /> Governance & Trust
          </motion.h2>

          <motion.p
            variants={item}
            className="text-neutral-600 leading-relaxed max-w-3xl"
          >
            CivicOS enforces accountability through measurable workflows,
            defined ownership, and data-driven insights — strengthening trust
            between citizens and public institutions.
          </motion.p>
        </motion.div>
      </section>

    </div>
  );
};

export default HomePage;
