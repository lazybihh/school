
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Sparkles,
  X,
  UserRound,
  Users
} from "lucide-react";
import "./Navbar.css";

const navLinks = [
  { name: "How It Works", link: "/working" },
  { name: "Contact", link: "/contact" }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();

  const isActive = (link) => {
    if (link === "/") return location.pathname === "/";
    return location.pathname === link ||
      location.pathname.startsWith(`${link}/`);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setFeaturesOpen(false);
    setSolutionsOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">
            <GraduationCap size={25} strokeWidth={2.2} />
          </span>
          <span className="logo-text">
            edu<span>flow</span><i>.</i>
          </span>
        </Link>

        <nav
          className={`navbar-links ${menuOpen ? "active" : ""}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          <div className="navbar-main-links">
            <Link
              to="/"
              className={isActive("/") ? "nav-active" : ""}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={isActive("/about") ? "nav-active" : ""}
              onClick={closeMenu}
            >
              About
            </Link>
            <div className={`navbar-features-menu ${featuresOpen ? "open" : ""}`}>
              <button
                className={`navbar-features-trigger ${
                  isActive("/features") ? "nav-active" : ""
                }`}
                type="button"
                aria-expanded={featuresOpen}
                aria-haspopup="true"
                aria-controls="navbar-features-dropdown"
                onClick={() => {
                  setFeaturesOpen(!featuresOpen);
                  setSolutionsOpen(false);
                }}
              >
                Features
                <ChevronDown size={15} />
              </button>
              <div
                className="navbar-features-dropdown navbar-feature-dropdown"
                id="navbar-features-dropdown"
              >
                <div className="navbar-feature-dropdown-heading">
                  <span className="navbar-feature-dropdown-mark">
                    <Sparkles size={16} />
                  </span>
                  <span>
                    <small>EDUFLOW FEATURES</small>
                    <strong>Make every school day flow.</strong>
                  </span>
                </div>
                <div className="navbar-feature-dropdown-links">
                  <Link to="/features" onClick={closeMenu} className="navbar-feature-overview">
                    <span className="navbar-feature-link-icon"><LayoutDashboard size={17} /></span>
                    <span>
                      <strong>Explore all features</strong>
                      <small>One connected school platform</small>
                    </span>
                    <ArrowUpRight size={15} />
                  </Link>
                  <Link to="/features/teacher" onClick={closeMenu}>
                    <span className="navbar-feature-link-icon"><BookOpen size={17} /></span>
                    <span>
                      <strong>For teachers</strong>
                      <small>Classroom tools &amp; routines</small>
                    </span>
                    <ArrowUpRight size={15} />
                  </Link>
                  <Link to="/features/student" onClick={closeMenu}>
                    <span className="navbar-feature-link-icon"><GraduationCap size={17} /></span>
                    <span>
                      <strong>For students</strong>
                      <small>Learning, organized</small>
                    </span>
                    <ArrowUpRight size={15} />
                  </Link>
                  <Link to="/features/parent" onClick={closeMenu}>
                    <span className="navbar-feature-link-icon"><Users size={17} /></span>
                    <span>
                      <strong>For parents</strong>
                      <small>A closer view of school life</small>
                    </span>
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
            {navLinks.slice(0, 1).map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={isActive(item.link) ? "nav-active" : ""}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className={`navbar-features-menu navbar-solutions-menu ${solutionsOpen ? "open" : ""}`}>
              <button
                className={`navbar-features-trigger navbar-solutions-trigger ${
                  isActive("/solutions") ? "nav-active" : ""
                }`}
                type="button"
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
                aria-controls="navbar-solutions-dropdown"
                onClick={() => {
                  setSolutionsOpen(!solutionsOpen);
                  setFeaturesOpen(false);
                }}
              >
                Solutions
                <ChevronDown size={15} />
              </button>
              <div
                className="navbar-features-dropdown"
                id="navbar-solutions-dropdown"
              >
                <span className="navbar-dropdown-heading">DASHBOARD SOLUTIONS</span>
                <Link to="/solutions" onClick={closeMenu}>
                  <span className="navbar-dropdown-icon all"><LayoutDashboard size={17} /></span>
                  <span>
                    <strong>Platform overview</strong>
                    <small>How EduFlow brings school life together</small>
                  </span>
                </Link>
                <Link to="/solutions/teacher" onClick={closeMenu}>
                  <span className="navbar-dropdown-icon teacher"><BookOpen size={17} /></span>
                  <span>
                    <strong>Teacher dashboard</strong>
                    <small>Classes, attendance &amp; learning</small>
                  </span>
                </Link>
                <Link to="/solutions/student" onClick={closeMenu}>
                  <span className="navbar-dropdown-icon student"><GraduationCap size={17} /></span>
                  <span>
                    <strong>Student dashboard</strong>
                    <small>School day &amp; progress</small>
                  </span>
                </Link>
                <Link to="/solutions/parent" onClick={closeMenu}>
                  <span className="navbar-dropdown-icon parent"><Users size={17} /></span>
                  <span>
                    <strong>Parent dashboard</strong>
                    <small>Attendance, updates &amp; progress</small>
                  </span>
                </Link>
              </div>
            </div>
            {navLinks.slice(1).map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={isActive(item.link) ? "nav-active" : ""}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            <Link
              to="/login"
              className={`navbar-login ${
                isActive("/login") ? "nav-active" : ""
              }`}
              onClick={closeMenu}
            >
              <UserRound size={18} />
              <span>Login</span>
            </Link>

            <Link
              to="/dashboard"
              className="navbar-btn"
              onClick={closeMenu}
            >
               Dashboard
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </nav>

        <button
          className="navbar-toggle"
          type="button"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setFeaturesOpen(false);
            setSolutionsOpen(false);
          }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}