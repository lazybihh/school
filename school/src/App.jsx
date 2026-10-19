import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import TeacherFeatures from "./pages/Features/TeacherFeatures";
import StudentFeatures from "./pages/Features/StudentFeatures";
import ParentFeatures from "./pages/Features/ParentFeatures";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Solutions from "./pages/Solutions";
import TeacherSolution from "./pages/Solutions/TeacherSolution";
import StudentSolution from "./pages/Solutions/StudentSolution";
import ParentSolution from "./pages/Solutions/ParentSolution";
import Working from "./pages/working";
import ScrollToTop from "./components/ScrollToTop";

import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import ParentDashboard from "./pages/dashboard/parent/ParentDashboard";
import TeacherDashboard from "./pages/dashboard/teacher/TeacherDashboard";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { SchoolProvider } from "./context/SchoolContext";

import "./pages/dashboard/admin/Admin.css";
import "./pages/dashboard/shared/Role.css";

export default function App() {
  return (
    <BrowserRouter>
      <SchoolProvider>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/features/teacher" element={<TeacherFeatures />} />
          <Route path="/features/student" element={<StudentFeatures />} />
          <Route path="/features/parent" element={<ParentFeatures />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/teacher" element={<TeacherSolution />} />
          <Route path="/solutions/student" element={<StudentSolution />} />
          <Route path="/solutions/parent" element={<ParentSolution />} />
          <Route path="/working" element={<Working />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute />}
          />

          <Route
            path="/dashboard/student/*"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/parent/*"
            element={
              <ProtectedRoute role="parent">
                <ParentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/teacher/*"
            element={
              <ProtectedRoute role="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/admin/*"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </SchoolProvider>
    </BrowserRouter>
  );
}
