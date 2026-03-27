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

/* ───────── ANIMATION CONFIG ───────── */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const HomePage = () => {
  return (
    <div className="bg-neutral-50 text-neutral-900">

      {/* ───────── HERO (3D + GLASS) ───────── */}
      <section className="relative overflow-hidden border-b border-neutral-200">

        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-neutral-100" />

        {/* Floating blur lights */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-300 opacity-30 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-300 opacity-30 blur-3xl rounded-full" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative max-w-7xl mx-auto px-8 py-28 grid lg:grid-cols-2 gap-20"
        >

          {/* LEFT */}
          <motion.div variants={item}>
            <span className="text-xs uppercase tracking-widest text-neutral-500">
              Civic Digital Infrastructure
            </span>

            <h1 className="mt-6 text-5xl font-semibold leading-tight">
              Smart Civic System for
              <span className="block text-teal-600">
                Modern Governance
              </span>
            </h1>

            <p className="mt-8 text-lg text-neutral-600 leading-relaxed">
              A unified digital platform connecting citizens and authorities
              for faster issue reporting, tracking, and resolution.
            </p>

            <div className="mt-12 flex gap-4">
              <Link
                to="/login"
                className="px-6 py-3 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 transition"
              >
                Get Started
              </Link>

              <Link
                to="/about"
                className="px-6 py-3 rounded-md border border-neutral-300 hover:bg-neutral-100 transition"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* RIGHT (3D CARD) */}
          <motion.div
            variants={item}
            whileHover={{ rotateY: 8, rotateX: 4 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <div className="bg-white/70 backdrop-blur-xl border border-neutral-200 rounded-2xl p-6 shadow-2xl">

              <h3 className="text-lg font-medium mb-4">
                Live Activity
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 rounded-lg border">
                  🚧 Road repair reported in Ranchi
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg border">
                  ⚡ Streetlight issue resolved
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg border">
                  🚨 Emergency flood alert active
                </div>
              </div>

            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* ───────── METRICS ───────── */}
      <section className="py-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            ["Active Reports", "54K+", <FiAlertCircle />],
            ["Resolution Time", "30 hrs", <FiClock />],
            ["Departments", "45+", <FiLayers />],
            ["Cities", "120+", <FiTrendingUp />],
          ].map(([label, value, icon]) => (
            <motion.div
              key={label}
              variants={item}
              whileHover={{ y: -6, scale: 1.03 }}
              className="bg-white/70 backdrop-blur-xl border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition"
            >
              <div className="flex items-center gap-3 text-neutral-500">
                {icon}
                <span className="text-xs uppercase">{label}</span>
              </div>
              <p className="mt-3 text-3xl font-semibold">{value}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ───────── CITIZEN FLOW ───────── */}
      <section className="bg-white py-24 border-t border-neutral-200">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="max-w-7xl mx-auto px-8"
        >
          <motion.h2
            variants={item}
            className="text-2xl font-medium mb-12 flex items-center gap-3"
          >
            <FiUsers /> Citizen Experience
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["Report", "Submit civic issues quickly.", <FiAlertCircle />],
              ["Track", "Monitor progress in real time.", <FiActivity />],
              ["Resolve", "Get updates & resolution.", <FiCheckCircle />],
            ].map(([title, desc, icon]) => (
              <motion.div
                key={title}
                variants={item}
                whileHover={{ y: -6 }}
                className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="text-teal-600 mb-4 text-xl">{icon}</div>
                <h3 className="font-medium mb-2">{title}</h3>
                <p className="text-sm text-neutral-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───────── AUTHORITY SECTION ───────── */}
      <section className="bg-neutral-950 text-white py-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="max-w-7xl mx-auto px-8"
        >
          <motion.h2
            variants={item}
            className="text-2xl font-medium mb-12 flex items-center gap-3"
          >
            <FiShield /> Authority System
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["Central Dashboard", "Manage all reports.", <FiLayers />],
              ["Prioritization", "Handle urgency smartly.", <FiTrendingUp />],
              ["Tracking", "Full lifecycle visibility.", <FiClock />],
            ].map(([title, desc, icon]) => (
              <motion.div
                key={title}
                variants={item}
                whileHover={{ y: -6 }}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:shadow-xl transition"
              >
                <div className="text-teal-400 mb-4">{icon}</div>
                <h3 className="font-medium mb-2">{title}</h3>
                <p className="text-sm text-neutral-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default HomePage;