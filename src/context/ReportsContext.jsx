import React, { createContext, useContext, useState, useEffect } from "react";

const ReportsContext = createContext();

const INITIAL_REPORTS = [
  {
    id: 101,
    type: "Issue",
    title: "Deep Pothole on Main Road Sector 4",
    description: "Large road crater causing traffic bottleneck near Ranchi Shopping Complex.",
    location: "Main Road, Ranchi",
    priority: "High",
    status: "In Progress",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    department: "Public Works Department"
  },
  {
    id: 102,
    type: "Issue",
    title: "Water Supply Pipeline Leakage",
    description: "Clean drinking water leaking continuously onto the main avenue.",
    location: "Civil Lines Ward 12, Ranchi",
    priority: "Medium",
    status: "Submitted",
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    department: "Water & Sanitation"
  },
  {
    id: 103,
    type: "Emergency",
    title: "Heavy Urban Flooding & Waterlogging",
    description: "Flood water encroaching ground levels near Harmu River bridge.",
    location: "Harmu River Area, Ranchi",
    priority: "High",
    status: "Critical",
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    department: "Disaster Response Unit"
  },
  {
    id: 104,
    type: "Issue",
    title: "Streetlight Fault & Darkness",
    description: "Whole lane dark due to damaged electrical transformer box.",
    location: "Bariatu Road, Ranchi",
    priority: "Low",
    status: "Resolved",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    department: "Electrical Power Board"
  }
];

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem("civic_reports");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved reports", e);
      }
    }
    return INITIAL_REPORTS;
  });

  useEffect(() => {
    localStorage.setItem("civic_reports", JSON.stringify(reports));
  }, [reports]);

  const addReport = (newReport) => {
    setReports((prev) => [newReport, ...prev]);
  };

  const updateReportStatus = (id, newStatus) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <ReportsContext.Provider value={{ reports, addReport, updateReportStatus }}>
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    return {
      reports: INITIAL_REPORTS,
      addReport: () => {},
      updateReportStatus: () => {}
    };
  }
  return context;
};
