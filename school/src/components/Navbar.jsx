
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  GraduationCap,
  ArrowUpRight,
  Menu,
  X,
  UserRound
} from "lucide-react";
import "./Navbar.css";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Features", link: "/features" },
  { name: "Solutions", link: "/solutions" },
  { name: "How It Works", link: "/working" },
  { name: "Contact", link: "/contact" }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (link) => {
    if (link === "/") return location.pathname === "/";
    return location.pathname === link ||
      location.pathname.startsWith(`${link}/`);
  };

  const closeMenu = () => setMenuOpen(false);

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

        <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <div className="navbar-main-links">
            {navLinks.map((item) => (
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
              to="/contact"
              className="navbar-btn"
              onClick={closeMenu}
            >
              Request Demo
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </nav>

        <button
          className="navbar-toggle"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}