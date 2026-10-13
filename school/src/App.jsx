
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Solutions from "./pages/Solutions";
import Dashboard from "./pages/Dashboard";
import Working from "./pages/working";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/working" element={<Working />} />  
      </Routes>
    </BrowserRouter>
  );
}