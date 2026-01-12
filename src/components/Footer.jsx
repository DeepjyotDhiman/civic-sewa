import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 mt-24">
      <div className="max-w-7xl mx-auto px-8 py-16 grid gap-12 md:grid-cols-3">

        {/* Platform */}
        <div>
          <h3 className="text-sm font-medium text-neutral-100 mb-4">
            CivicOS Platform
          </h3>
          <p className="text-sm leading-relaxed">
            CivicOS is a digital governance platform designed to coordinate
            citizens and authorities through structured issue reporting,
            transparent workflows, and data-driven public service delivery.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm font-medium text-neutral-100 mb-4">
            Platform
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-neutral-100">Home</Link></li>
            <li><Link to="/about" className="hover:text-neutral-100">About</Link></li>
            <li><Link to="/services" className="hover:text-neutral-100">Capabilities</Link></li>
            <li><Link to="/login" className="hover:text-neutral-100">Login</Link></li>
          </ul>
        </div>

        {/* Governance */}
        <div>
          <h3 className="text-sm font-medium text-neutral-100 mb-4">
            Governance & Trust
          </h3>
          <p className="text-sm leading-relaxed">
            Built with transparency, accountability, and operational clarity
            at its core. Designed to support modern civic governance and
            public-sector workflows.
          </p>
        </div>
      </div>

      <div className="border-t border-neutral-800 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} CivicOS · Public Digital Infrastructure
      </div>
    </footer>
  );
};

export default Footer;
