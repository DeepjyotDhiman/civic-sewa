import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = ({ isLoggedIn, onLogout, userRole }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isAuthority = location.pathname.startsWith("/authority");

  const linkBase =
    "px-3 py-2 text-sm rounded-md transition-colors duration-200";

  const linkClass = ({ isActive }) =>
    `${linkBase} ${
      isActive
        ? "text-teal-600"
        : "text-neutral-600 hover:text-neutral-900"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b ${
        isAuthority
          ? "bg-neutral-950 border-neutral-800 text-neutral-100"
          : "bg-white/90 backdrop-blur border-neutral-200 text-neutral-900"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link
          to="/"
          className={`text-lg font-medium tracking-tight ${
            isAuthority ? "text-neutral-100" : "text-neutral-900"
          }`}
        >
          Civic<span className="text-teal-500">OS</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/services" className={linkClass}>Capabilities</NavLink>
          <NavLink to="/feedback" className={linkClass}>Feedback</NavLink>
          {isLoggedIn && userRole === "citizen" && (
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}

          {isLoggedIn && userRole === "authority" && (
            <NavLink to="/authority/dashboard" className={linkClass}>
              Authority Console
            </NavLink>
          )}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className={`text-sm ${
                isAuthority
                  ? "text-neutral-400 hover:text-neutral-100"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-sm ${
                  isAuthority
                    ? "text-neutral-300"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 text-sm rounded-md
                           bg-neutral-900 text-white
                           hover:bg-neutral-800"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`md:hidden border-t ${
            isAuthority
              ? "bg-neutral-950 border-neutral-800"
              : "bg-white border-neutral-200"
          }`}
        >
          <div className="px-6 py-4 space-y-2">
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
                Dashboard
              </NavLink>
            )}

            {isLoggedIn && userRole === "authority" && (
              <NavLink to="/authority/dashboard" className={linkClass} onClick={() => setOpen(false)}>
                Authority Console
              </NavLink>
            )}

            <div className="pt-3 border-t border-neutral-200">
              {isLoggedIn ? (
                <button
                  onClick={onLogout}
                  className="text-sm text-neutral-600"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="block text-sm text-neutral-600">
                    Login
                  </Link>
                  <Link to="/register" className="block text-sm text-neutral-600">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
