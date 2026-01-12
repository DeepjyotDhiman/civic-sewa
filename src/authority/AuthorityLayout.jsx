import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiGrid, FiList, FiLogOut } from "react-icons/fi";

const AuthorityLayout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">

      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 px-6 py-8">
        <h2 className="text-xl font-semibold mb-10">
          Authority Panel
        </h2>

        <nav className="space-y-3">
          <NavLink
            to="/authority/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-md
                       text-neutral-300 hover:bg-neutral-800 hover:text-white"
          >
            <FiGrid /> Dashboard
          </NavLink>

          <NavLink
            to="/authority/issues"
            className="flex items-center gap-3 px-3 py-2 rounded-md
                       text-neutral-300 hover:bg-neutral-800 hover:text-white"
          >
            <FiList /> All Issues
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-12 flex items-center gap-2 text-red-400 hover:text-red-300"
        >
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthorityLayout;
