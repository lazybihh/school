
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ArrowUpRight,
  MapPin,
  Menu,
  X
} from "lucide-react";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>

      {/* TOP INFORMATION BAR */}
      <div className="veda-topbar">
        <div className="veda-topbar-inner">

          <span className="veda-motto">
            Discipline <span>•</span> Knowledge <span>•</span> Character <span>•</span> Success
          </span>

          <div className="veda-topbar-right">
            <span>
              <MapPin size={13} />
              Thurana (Hansi), Haryana
            </span>
          </div>

        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <header
        className="veda-header"
        onKeyDown={(event) => {
          if (event.key === "Escape") closeMenu();
        }}
      >
        <nav className="veda-navbar" aria-label="Main navigation">

          <div className="veda-navbar-inner">

            <Link to="/" className="veda-brand" onClick={closeMenu}>
              <img
                src="/veda-logo.webp"
                alt="VEDA International School Logo"
                className="veda-logo"
              />

              <div className="veda-brand-text">
                <span className="veda-brand-name">VEDA</span>
                <span className="veda-brand-subtitle">INTERNATIONAL SCHOOL</span>
                <span className="veda-brand-location">THURANA (HANSI)</span>
              </div>
            </Link>

            <div
              id="veda-primary-navigation"
              className={`veda-nav-links ${menuOpen ? "veda-nav-open" : ""}`}
            >

              <NavLink to="/" end onClick={closeMenu}>
                Home
              </NavLink>

              <NavLink to="/about" onClick={closeMenu}>
                About Us
              </NavLink>

              <NavLink to="/admissions" onClick={closeMenu}>
                Admissions
              </NavLink>

              <NavLink to="/blog-news" onClick={closeMenu}>
                Blog & News
              </NavLink>

              <NavLink to="/gallery" onClick={closeMenu}>
                Gallery
              </NavLink>

              <NavLink to="/contact" onClick={closeMenu}>
                Contact Us
              </NavLink>

              <Link to="/login" className="veda-login-btn" onClick={closeMenu}>
                School Portal
                <ArrowUpRight size={17} />
              </Link>

            </div>

            <button
              type="button"
              className="veda-mobile-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="veda-primary-navigation"
            >
              {menuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>

          </div>

        </nav>

      </header>
    </>
  );
}

export default Navbar;
