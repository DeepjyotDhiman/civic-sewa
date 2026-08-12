import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiShield, FiUser, FiLogOut, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ isLoggedIn, onLogout, userRole }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isAuthority = location.pathname.startsWith("/authority");

  const linkBase =
    "px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-1.5";

  const linkClass = ({ isActive }) =>
    `${linkBase} ${
      isActive
        ? "bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-sm"
        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
    }`;

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-slate-800/80">
      <nav className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Brand Identity */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-cyan-500 flex items-center justify-center shadow-glow-teal group-hover:scale-105 transition-transform duration-300">
            <span className="font-heading font-extrabold text-slate-950 text-xl tracking-tighter">C</span>
          </div>
          <div>
            <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-teal-400 transition-colors">
              Civic<span className="gradient-text">OS</span>
            </span>
            <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              Smart Governance
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/services" className={linkClass}>Capabilities</NavLink>
          <NavLink to="/feedback" className={linkClass}>Feedback</NavLink>

          {isLoggedIn && userRole === "citizen" && (
            <NavLink to="/dashboard" className={linkClass}>
              <FiUser className="text-teal-400" />
              Citizen Portal
            </NavLink>
          )}

          {isLoggedIn && userRole === "authority" && (
            <NavLink to="/authority/dashboard" className={linkClass}>
              <FiShield className="text-amber-400" />
              Authority Console
            </NavLink>
          )}
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="capitalize">{userRole}</span>
              </div>
              <button
                onClick={onLogout}
                className="px-3.5 py-2 text-sm font-medium text-slate-400 hover:text-rose-400 bg-slate-900/60 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 rounded-xl transition-all duration-200 flex items-center gap-2"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-glow-teal hover:shadow-glow-emerald transition-all duration-200 flex items-center gap-1.5 group"
              >
                <span>Get Started</span>
                <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-6 py-4 space-y-2"
          >
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
              About
            </NavLink>
            <NavLink to="/services" className={linkClass} onClick={() => setOpen(false)}>
              Capabilities
            </NavLink>
            <NavLink to="/feedback" className={linkClass} onClick={() => setOpen(false)}>
              Feedback
            </NavLink>

            {isLoggedIn && userRole === "citizen" && (
              <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>
                Citizen Portal
              </NavLink>
            )}

            {isLoggedIn && userRole === "authority" && (
              <NavLink to="/authority/dashboard" className={linkClass} onClick={() => setOpen(false)}>
                Authority Console
              </NavLink>
            )}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    onLogout();
                    setOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-sm font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="w-full py-2.5 text-center text-sm font-medium text-slate-200 bg-slate-900 border border-slate-800 rounded-xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="w-full py-2.5 text-center text-sm font-semibold text-slate-950 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
