import React from "react";
import { motion } from "framer-motion";
import {
  FiAlertCircle,
  FiMap,
  FiActivity,
  FiClock,
  FiUsers,
  FiBarChart2
} from "react-icons/fi";

const capabilities = [
  {
    title: "Structured Issue Intake",
    desc: "Categorized reporting with location, severity, and department mapping.",
    icon: <FiAlertCircle />
  },
  {
    title: "Geographic Mapping",
    desc: "Location-aware issue visualization across regions and wards.",
    icon: <FiMap />
  },
  {
    title: "Lifecycle Tracking",
    desc: "Every issue follows a measurable resolution lifecycle.",
    icon: <FiActivity />
  },
  {
    title: "Time-Bound Resolution",
    desc: "Defined SLAs and escalation mechanisms.",
    icon: <FiClock />
  },
  {
    title: "Citizen Communication",
    desc: "Transparent updates and feedback loops.",
    icon: <FiUsers />
  },
  {
    title: "Governance Analytics",
    desc: "Insights for planning, prioritization, and audits.",
    icon: <FiBarChart2 />
  }
];

const CapabilitiesPage = () => {
  return (
    <div className="bg-neutral-50 text-neutral-900">

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-8 py-24">
          <h1 className="text-4xl font-semibold">
            Platform Capabilities
          </h1>
          <p className="mt-6 text-neutral-600 max-w-3xl">
            CivicOS provides a comprehensive set of capabilities designed to
            support modern, transparent, and accountable civic governance.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-3 gap-8">
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              whileHover={{ y: -4 }}
              className="border border-neutral-200 rounded-xl p-6"
            >
              <div className="text-teal-600 mb-4">{cap.icon}</div>
              <h3 className="font-medium mb-2">{cap.title}</h3>
              <p className="text-sm text-neutral-600">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default CapabilitiesPage;
