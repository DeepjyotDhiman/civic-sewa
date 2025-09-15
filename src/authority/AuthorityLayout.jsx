import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiGrid, FiList, FiLogOut } from 'react-icons/fi';
import NotificationsBell from '../components/NotificationsBell';
import './AuthorityLayout.css';

const AuthorityLayout = ({ onLogout }) => {
  return (
    <div className="authority-layout">
      <aside className="authority-sidebar">
        <div className="sidebar-header">
          <h3>Authority Portal</h3>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/authority/dashboard" className="sidebar-link">
            <FiGrid />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/authority/issues" className="sidebar-link">
            <FiList />
            <span>All Issues</span>
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <button onClick={onLogout} className="sidebar-link logout-btn">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="authority-main-content">
        <header className="authority-header">
          {/* This header is part of the main content area, not the sidebar */}
          <div className="header-actions">
            <NotificationsBell userRole="authority" />
          </div>
        </header>
        <main className="authority-page-content">
          <Outlet /> {/* Child routes (Dashboard, AllIssuesPage) render here */}
        </main>
      </div>
    </div>
  );
};

export default AuthorityLayout;