import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Working.css";

export default function Working() {
  return (
    <>
      <Navbar />
      <main className="working-placeholder">
        <div className="working-placeholder-card">
          <span>EDUFLOW</span>
          <h1>The page is in work</h1>
          <p>This page is being prepared. Please check back soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}