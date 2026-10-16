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

import StudentDashboard from "./pages/Dashboard/student";

import ParentDashboard from "./pages/Dashboard/parent";
import TeacherDashboard from "./pages/Dashboard/teacher";
import AdminDashboard from "./pages/Dashboard/admin";

import { SchoolProvider } from "./context/SchoolContext";


function DashboardRedirect() {
  const user = JSON.parse(
    localStorage.getItem("eduflowUser") || "null"
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navigate
      to={`/dashboard/${user.role}`}
      replace
    />
  );
}


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
          <Route path="/dashboard" element={<DashboardRedirect />} />

          <Route
            path="/dashboard/student/*"
            element={<StudentDashboard />} />

          <Route
            path="/dashboard/parent/*"
            element={<ParentDashboard />}
          />

          <Route
            path="/dashboard/teacher/*"
            element={<TeacherDashboard />}
          />

          <Route
            path="/dashboard/admin/*"
            element={<AdminDashboard />}
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
