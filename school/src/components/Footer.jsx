
import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowUpRight,
  Mail,
  ChevronUp
} from "lucide-react";

import "./Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-content">

          <div className="footer-about">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">
                <GraduationCap size={24} />
              </span>

              <span className="footer-logo-name">
                edu<span>flow</span><i>.</i>
              </span>
            </Link>

            <h3>
              Making education <span>flow better.</span>
            </h3>

            <p>
              Connecting students, teachers, parents and
              schools through one simple experience.
              Everything in its place, everyone connected.
            </p>

            <span className="footer-tagline">
              SIMPLER. SMARTER. CONNECTED.
            </span>
          </div>

          <div className="footer-column">
            <h4>Explore</h4>

            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/features">Features</Link>
            <Link to="/solutions">Solutions</Link>
          </div>

          <div className="footer-column">
            <h4>Solutions</h4>

            <Link to="/solutions/teacher">For Teachers</Link>
            <Link to="/solutions/student">For Students</Link>
            <Link to="/solutions/parent">For Parents</Link>
            <Link to="/working">How It Works</Link>
          </div>

          <div className="footer-contact">
            <h4>Let's Connect</h4>

            <p>
              Curious about EduFlow? Explore the project
              or get in touch with us.
            </p>

            <Link to="/contact" className="footer-contact-btn">
              <Mail size={17} />
              Contact Us
              <ArrowUpRight size={17} />
            </Link>

            <Link to="/login" className="footer-dashboard-link">
              Explore Dashboards
              <ArrowUpRight size={15} />
            </Link>
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} EduFlow.
            <span> Frontend school management project.</span>
          </p>

          <span>Designed for better learning.</span>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-top"
          >
            Back to Top <ChevronUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}
