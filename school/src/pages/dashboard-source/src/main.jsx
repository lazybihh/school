import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import SchoolProvider from "./context/SchoolProvider";

import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import TeacherDashboard from "./pages/dashboard/teacher/TeacherDashboard";
import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import ParentDashboard from "./pages/dashboard/parent/ParentDashboard";
import {
  previewEnabled,
  readDashboardUser,
} from "./pages/dashboard/shared/preview";
import "./pages/dashboard/admin/Admin.css";
import "./pages/dashboard/shared/Role.css";
import "./preview.css";

function Preview() {
  return (
    <div className="preview-page">
      <div className="preview-card">
        <span className="preview-tag">DASHBOARD DEVELOPMENT TEMPLATE</span>
        <h1>
          EduFlow<span>.</span>
        </h1>
        <p>
          Choose a dashboard to preview. Role dashboards use a matching existing
          record when available, or an isolated temporary identity so unmatched
          accounts do not expose other records. This development preview is not
          authentication.
        </p>
        <div className="preview-grid">
          {[
            ["Admin", "admin"],
            ["Teacher", "teacher"],
            ["Student", "student"],
            ["Parent", "parent"],
          ].map(([label, role]) => (
            <Link key={role} to={`/dashboard/${role}`}>
              {label}
              <span>↗</span>
            </Link>
          ))}
        </div>
        <small>
          Connect your real website login before using these dashboards in
          production.
        </small>
      </div>
    </div>
  );
}

function PreviewUnavailable() {
  return (
    <div className="preview-page">
      <div className="preview-card">
        <span className="preview-tag">EDUFLOW DASHBOARDS</span>
        <h1>Website login required</h1>
        <p>
          Development preview is disabled. Connect your website login to access
          the dashboards.
        </p>
      </div>
    </div>
  );
}

function ProtectedDashboard({ role, children }) {
  if (previewEnabled) {
    return children;
  }

  const user = readDashboardUser();
  const authenticatedRole =
    typeof user?.role === "string" ? user.role.toLowerCase() : "";

  if (authenticatedRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <SchoolProvider>
        <Routes>
          <Route
            path="/"
            element={previewEnabled ? <Preview /> : <PreviewUnavailable />}
          />
          <Route
            path="/login"
            element={previewEnabled ? <Preview /> : <PreviewUnavailable />}
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedDashboard role="admin">
                <AdminDashboard />
              </ProtectedDashboard>
            }
          />
          <Route
            path="/dashboard/teacher"
            element={
              <ProtectedDashboard role="teacher">
                <TeacherDashboard />
              </ProtectedDashboard>
            }
          />
          <Route
            path="/dashboard/student"
            element={
              <ProtectedDashboard role="student">
                <StudentDashboard />
              </ProtectedDashboard>
            }
          />
          <Route
            path="/dashboard/parent"
            element={
              <ProtectedDashboard role="parent">
                <ParentDashboard />
              </ProtectedDashboard>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SchoolProvider>
    </BrowserRouter>
  );
}
createRoot(document.getElementById("root")).render(<App />);
