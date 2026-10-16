
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  Check,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Sparkles,
  UserRound,
  Users
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Working.css";

const steps = [
  {
    number: "01",
    title: "Choose Your Role",
    icon: UserRound,
    description:
      "Discover the experience designed for teachers, students, parents and administrators."
  },
  {
    number: "02",
    title: "Set Up Your Profile",
    icon: Settings,
    description:
      "See how your personal details and school information fit into one organised workspace."
  },
  {
    number: "03",
    title: "Explore the Features",
    icon: LayoutDashboard,
    description:
      "Get familiar with attendance, schedules, student records and school updates."
  },
  {
    number: "04",
    title: "Stay Connected",
    icon: Users,
    description:
      "Explore how everyone in the school community can stay informed in one place."
  }
];

export default function HowItWorks() {
  const [photoAvailable, setPhotoAvailable] = useState(true);

  return (
    <>
      <Navbar />

      <main className="hiw-page">
        {/* HERO */}

        <section className="hiw-hero">
          <div className="hiw-container hiw-hero-layout">
            <div className="hiw-hero-content">
              <div className="hiw-eyebrow">
                <span></span>
                GET STARTED IN 4 SIMPLE STEPS
              </div>

              <h1>
                How It
                <span>, Works.</span>
              </h1>

              <p className="hiw-hero-description">
                A simpler way to bring your school community together.
                Discover how EduFlow creates a clear, connected experience
                in four easy steps.
              </p>

              <div className="hiw-benefits">
                <div>
                  <span>
                    <Check size={16} strokeWidth={3} />
                  </span>
                  Easy to explore
                </div>

                <div>
                  <span>
                    <Check size={16} strokeWidth={3} />
                  </span>
                  Designed for every role
                </div>
              </div>

              <a href="#hiw-journey" className="hiw-primary-button">
                Explore the steps
                <ArrowRight size={19} />
              </a>

              <p className="hiw-hero-caption">
                <Sparkles size={15} />
                One platform. A more connected school day.
              </p>
            </div>

            {/* HERO IMAGE */}

            <div className="hiw-hero-visual">
              <div className="hiw-photo-shape">
                {photoAvailable && (
                  <img
                    src="/how-it-works-hero.png"
                    alt="Students learning together in a classroom"
                    onError={() => setPhotoAvailable(false)}
                  />
                )}
              </div>

              <div className="hiw-visual-decoration hiw-decoration-one"></div>
              <div className="hiw-visual-decoration hiw-decoration-two"></div>

              <div className="hiw-floating-notice">
                <span>
                  <Bell size={20} />
                </span>

                <div>
                  <strong>Stay informed</strong>
                  <p>Important school updates, all in one place.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hiw-hero-wave"></div>
        </section>

        {/* FOUR STEPS */}

        <section className="hiw-journey" id="hiw-journey">
          <div className="hiw-container">
            <div className="hiw-section-heading">
              <div className="hiw-eyebrow">
                <span></span>
                THE JOURNEY
              </div>

              <h2>
                Four steps to a <span>simpler school day.</span>
              </h2>

              <p>
                From discovering your role to exploring everyday tools,
                getting started with EduFlow is designed to feel effortless.
              </p>
            </div>

            <div className="hiw-steps">
              {steps.map(step => {
                const Icon = step.icon;

                return (
                  <article className="hiw-step-card" key={step.number}>
                    <div className="hiw-step-top">
                      <span className="hiw-step-icon">
                        <Icon size={28} strokeWidth={1.9} />
                      </span>

                      <span className="hiw-step-number">
                        {step.number}
                      </span>
                    </div>

                    <h3>{step.title}</h3>
                    <p>{step.description}</p>

                    {step.number !== "04" && (
                      <span
                        className="hiw-step-arrow"
                        aria-hidden="true"
                      >
                        <ArrowRight size={18} />
                      </span>
                    )}
                  </article>
                );
              })}
            </div>

            {/* CTA */}

            <div className="hiw-cta">
              <div className="hiw-cta-icon">
                <GraduationCap size={42} strokeWidth={1.7} />
              </div>

              <div className="hiw-cta-text">
                <span>YOUR NEXT STEP STARTS HERE</span>

                <h2>Ready to see EduFlow in action?</h2>

                <p>
                  Explore our interactive dashboard and discover how
                  a connected school workspace could look.
                </p>
              </div>

              <Link to="/dashboard" className="hiw-cta-button">
                Explore Dashboard
                <ArrowRight size={19} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
