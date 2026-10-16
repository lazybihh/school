
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarCheck,
  Check,
  Compass,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  MessageSquare,
  Users
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";

const benefits = [
  {
    icon: CalendarCheck,
    title: "More Organisation",
    text: "Keep classes, assignments, attendance and notices in one place.",
    color: "blue"
  },
  {
    icon: MessageSquare,
    title: "Better Communication",
    text: "Make important school updates easier to share and follow.",
    color: "yellow"
  },
  {
    icon: Users,
    title: "Greater Accessibility",
    text: "Find relevant school information from a clear, responsive interface.",
    color: "green"
  }
];

const values = [
  {
    icon: Lightbulb,
    title: "Thoughtful Ideas",
    text: "We explore simple solutions to make everyday school experiences easier.",
    color: "blue"
  },
  {
    icon: Users,
    title: "Connection",
    text: "Students, teachers and parents deserve experiences that work together.",
    color: "green"
  },
  {
    icon: HeartHandshake,
    title: "People First",
    text: "Every design decision begins with the people who use the platform.",
    color: "yellow"
  },
  {
    icon: Compass,
    title: "Purpose",
    text: "We focus on useful features and clear information, not unnecessary complexity.",
    color: "purple"
  }
];

function AboutPhoto({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`about-photo ${className}`}>
      {failed ? (
        <div className="about-photo-fallback">
          <GraduationCap size={42} />
          <span>Inspired by education.</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export default function About() {
  return (
    <>
      <Navbar />

      <main className="about-page">

        {/* HERO */}

        <section className="about-hero">
          <div className="about-container about-hero-grid">

            <div className="about-hero-visual">
              <div className="about-hero-shape" />

              <AboutPhoto
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85"
                alt="Teacher helping students in a classroom"
                className="about-hero-photo"
              />

              <div className="about-photo-note">
                <span>
                  <GraduationCap size={25} />
                </span>

                <strong>
                  Better tools.
                  <br />
                  Brighter futures.
                </strong>
              </div>

              <span className="about-spark about-spark-one">✳</span>
              <span className="about-spark about-spark-two">✦</span>
            </div>

            <div className="about-hero-copy">
              <span className="about-eyebrow">
                <span className="about-eyebrow-dot" />
                ABOUT EDUFLOW
              </span>

              <h1>
                School life is complicated.
                <span> Staying connected shouldn't be.</span>
              </h1>

              <p className="about-hero-intro">
                EduFlow was created to bring students, teachers and
                parents together through one simple digital experience.
                We believe school information should be easy to find,
                understand and follow — from the classroom to home.
              </p>

              <div className="about-benefits">
                {benefits.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className={`about-benefit about-${item.color}`}
                    >
                      <span className="about-benefit-icon">
                        <Icon size={25} strokeWidth={2} />
                      </span>

                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  );
                })}
              </div>

              <div className="about-hero-actions">
                <Link to="/working" className="about-btn about-btn-primary">
                  Learn How It Works
                  <ArrowRight size={18} />
                </Link>

                <Link to="/features" className="about-text-link">
                  Explore Features
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* VALUES */}

        <section className="about-values">
          <div className="about-container about-values-layout">

            <div className="about-values-heading">
              <span className="about-eyebrow">
                <span className="about-eyebrow-dot" />
                OUR VALUES
              </span>

              <h2>
                What guides us.
                <span> Every step of the way.</span>
              </h2>

              <p>
                Our values shape how we design and improve EduFlow.
                They keep us focused on what matters most — making
                the school experience more useful for everyone.
              </p>

              <div className="about-values-accent" />
            </div>

            <div className="about-values-grid">
              {values.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className={`about-value about-${item.color}`}
                  >
                    <span className="about-value-icon">
                      <Icon size={27} strokeWidth={1.9} />
                    </span>

                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>

          </div>
        </section>

        {/* OUR STORY */}

        <section className="about-story" id="our-story">
          <div className="about-container about-story-grid">

            <div className="about-story-copy">
              <span className="about-eyebrow">
                <span className="about-eyebrow-dot" />
                THE IDEA BEHIND EDUFLOW
              </span>

              <h2>
                Built around a simple question.
                <span> What if school life felt easier?</span>
              </h2>

              <p>
                Everyday school activities involve different people,
                responsibilities and information. Teachers prepare
                lessons and manage records. Students need to follow
                their work. Parents want to stay informed about
                their child's progress.
              </p>

              <p>
                EduFlow brings these experiences together through
                connected role-based dashboards. It's currently a
                frontend demonstration built to explore how school
                management can feel more organised and approachable.
              </p>

              <div className="about-story-points">
                <span><Check size={16} /> Information that is easier to follow</span>
                <span><Check size={16} /> Connected school experiences</span>
                <span><Check size={16} /> Simple, responsive interfaces</span>
              </div>

              <Link to="/solutions" className="about-text-link">
                Explore Our Solutions
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="about-story-visual">
              <AboutPhoto
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=85"
                alt="Students learning together in a classroom"
                className="about-story-photo"
              />

              <div className="about-story-photo-label">
                <BookOpen size={21} />
                <span>Education comes first. Technology supports it.</span>
              </div>
            </div>

          </div>
        </section>

        {/* CONNECTION */}

        <section className="about-connection">
          <div className="about-container about-connection-grid">

            <div className="about-connection-copy">
              <span className="about-eyebrow">
                ONE CONNECTED EXPERIENCE
              </span>

              <h2>
                Different people.
                <span> One school community.</span>
              </h2>

              <p>
                A school works best when the right information
                reaches the right people. EduFlow gives each
                user a dedicated space while keeping relevant
                school records connected.
              </p>

              <Link to="/login" className="about-btn about-btn-primary">
                Explore EduFlow
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="about-connection-roles">
              <div>
                <span className="about-role-icon">
                  <GraduationCap size={24} />
                </span>
                <strong>Students</strong>
                <p>Follow lessons, homework, results and timetables.</p>
              </div>

              <div>
                <span className="about-role-icon">
                  <BookOpen size={24} />
                </span>
                <strong>Teachers</strong>
                <p>Manage attendance, assignments and academic records.</p>
              </div>

              <div>
                <span className="about-role-icon">
                  <Users size={24} />
                </span>
                <strong>Parents</strong>
                <p>Stay informed about their child's school journey.</p>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
