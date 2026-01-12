import React from "react";
import { motion } from "framer-motion";
import {
  FiLayers,
  FiUsers,
  FiShield,
  FiTrendingUp
} from "react-icons/fi";

const AboutPage = () => {
  return (
    <div className="bg-neutral-50 text-neutral-900">

      {/* Context */}
      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-8 py-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-semibold"
          >
            About CivicOS
          </motion.h1>

          <p className="mt-6 text-lg text-neutral-600 max-w-3xl leading-relaxed">
            CivicOS is a civic coordination platform designed to replace
            fragmented complaint systems with a unified, transparent, and
            accountable public service workflow.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16">

          <div>
            <h2 className="text-2xl font-medium mb-4 flex gap-3 items-center">
              <FiLayers /> Platform Vision
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              CivicOS treats civic issues as operational data — not isolated
              complaints. Each issue flows through a measurable lifecycle:
              intake, assignment, resolution, and closure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium mb-4 flex gap-3 items-center">
              <FiTrendingUp /> Governance Impact
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              By introducing transparency and accountability at every stage,
              CivicOS improves trust, reduces delays, and enables data-driven
              governance decisions.
            </p>
          </div>

        </div>
      </section>

      {/* Principles */}
      <section className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <h2 className="text-2xl font-medium mb-12">
            Design Principles
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["Citizen-Centric", "Clarity, visibility, and trust for every citizen.", <FiUsers />],
              ["Authority-Ready", "Operational tools designed for real workflows.", <FiShield />],
              ["Data-Driven", "Insights that improve planning and accountability.", <FiTrendingUp />],
            ].map(([title, desc, icon]) => (
              <div
                key={title}
                className="bg-white border border-neutral-200 rounded-xl p-6"
              >
                <div className="text-teal-600 mb-4">{icon}</div>
                <h3 className="font-medium mb-2">{title}</h3>
                <p className="text-sm text-neutral-600">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
