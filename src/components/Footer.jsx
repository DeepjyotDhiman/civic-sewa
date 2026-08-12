import React from "react";
import { Link } from "react-router-dom";
import { FiShield, FiHeart, FiGlobe, FiRadio } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 relative overflow-hidden">
      {/* Glow highlight background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-teal-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4 relative z-10">
        {/* Brand & Mission */}
        <div className="md:col-span-1 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center font-heading font-bold text-slate-950 text-lg">
              C
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-white">
              Civic<span className="gradient-text">OS</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            Next-generation civic governance portal connecting citizens with municipal authorities for rapid incident resolution and public infrastructure management.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
            <FiRadio className="animate-pulse" />
            <span>Systems Operational · 99.9% Uptime</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-teal-400 transition-colors">Home Overview</Link></li>
            <li><Link to="/about" className="hover:text-teal-400 transition-colors">Platform Mission</Link></li>
            <li><Link to="/services" className="hover:text-teal-400 transition-colors">Capabilities & Tools</Link></li>
            <li><Link to="/feedback" className="hover:text-teal-400 transition-colors">Citizen Feedback</Link></li>
          </ul>
        </div>

        {/* Portals */}
        <div>
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
            Portals
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/login" className="hover:text-teal-400 transition-colors">Sign In Portal</Link></li>
            <li><Link to="/register" className="hover:text-teal-400 transition-colors">Register Account</Link></li>
            <li><Link to="/dashboard" className="hover:text-teal-400 transition-colors">Citizen Dashboard</Link></li>
            <li><Link to="/authority/dashboard" className="hover:text-teal-400 transition-colors">Authority Console</Link></li>
          </ul>
        </div>

        {/* Governance & Trust */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
            Trust & Security
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Built with zero-trust architecture, end-to-end auditability, and transparent status workflows for municipal government departments.
          </p>
          <div className="pt-2 flex items-center gap-3 text-slate-400">
            <span className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-teal-400 transition-colors"><FiShield /></span>
            <span className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-teal-400 transition-colors"><FiGlobe /></span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-6">
        <span>© {new Date().getFullYear()} CivicOS Infrastructure. All rights reserved.</span>
        <span className="flex items-center gap-1 mt-2 sm:mt-0">
          Crafted for modern governance with <FiHeart className="text-rose-500" />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
