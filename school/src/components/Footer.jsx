
import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  Mail,
  MapPin,
  Instagram,
  Linkedin
} from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">

        <div className="footer-about">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">
              <GraduationCap size={24} />
            </span>
            edu<span>flow</span><i>.</i>
          </Link>

          <p>
            Making school management simpler, smarter,
            and more connected for everyone.
          </p>

          <div className="footer-socials" aria-label="Social media placeholders">
            <Instagram size={19} />
            <Linkedin size={19} />
          </div>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/features">Features</Link>
          <Link to="/#solutions">Solutions</Link>
        </div>

        <div className="footer-column">
          <h4>Our Platform</h4>
          <Link to="/features">Student Management</Link>
          <Link to="/features">Attendance</Link>
          <Link to="/features">Fee Management</Link>
          <Link to="/#how-it-works">How It Works</Link>
        </div>

        <div className="footer-column footer-contact">
          <h4>Get In Touch</h4>

          <p>
            <Mail size={17} />
            hello@eduflow.example
          </p>

          <p>
            <MapPin size={17} />
            Your school, connected.
          </p>

          <Link to="/contact" className="footer-contact-link">
            Send an Enquiry
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} EduFlow. Frontend concept project.
        </span>
        <span>Designed for better learning.</span>
      </div>
    </footer>
  );
}
