import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiList,
  FiLogOut,
  FiShield,
  FiBell,
  FiRadio,
  FiSearch,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import { motion } from "framer-motion";

const AuthorityLayout = ({ onLogout }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
      isActive
        ? "bg-teal-500/15 text-teal-400 border border-teal-500/30 shadow-glow-teal font-semibold"
        : "text-slate-400 hover:text-white hover:bg-slate-900"
    }`;

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`bg-slate-900/90 border-r border-slate-800/90 transition-all duration-300 relative flex flex-col justify-between p-6 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="space-y-8">
          {/* Sidebar Header Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-slate-950 font-bold font-heading text-lg shadow-sm">
                <FiShield />
              </div>
              {!collapsed && (
                <div>
                  <h2 className="font-heading font-bold text-base text-white tracking-tight">
                    Authority<span className="text-amber-400">HQ</span>
                  </h2>
                  <span className="block text-[10px] uppercase font-mono font-semibold text-slate-500">
                    Municipal Command
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-2">
            <NavLink to="/authority/dashboard" className={navClass}>
              <FiGrid className="text-lg shrink-0" />
              {!collapsed && <span>Telemetry Console</span>}
            </NavLink>

            <NavLink to="/authority/issues" className={navClass}>
              <FiList className="text-lg shrink-0" />
              {!collapsed && <span>Master Incident Queue</span>}
            </NavLink>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          {!collapsed && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 text-teal-400 flex items-center justify-center font-bold text-xs">
                HQ
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">City Commissioner</p>
                <p className="text-[10px] font-mono text-emerald-400 truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Session
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={`w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2.5 transition-all ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <FiLogOut />
            {!collapsed && <span>Exit Authority Session</span>}
          </button>
        </div>
      </aside>

      {/* Main Content View Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-semibold">
              <FiRadio className="animate-pulse" /> DISPATCH SERVER ONLINE
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline">Ranchi Municipal Region Node #01</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white relative cursor-pointer">
              <FiBell />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthorityLayout;
