import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="dashboard-placeholder">
        <div className="dashboard-placeholder-card">
          <span>EDUFLOW DASHBOARD</span>
          <h1>The page is in work</h1>
          <p>The dashboard is being prepared. Please check back soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}