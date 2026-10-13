
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Compass,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  School,
  Sparkles,
  Users
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";

const values = [
  {
    icon: Lightbulb,
    title: "Thoughtful Ideas",
    description:
      "We explore simple solutions to make everyday school experiences easier."
  },
  {
    icon: Users,
    title: "Connection",
    description:
      "Different members of a school community deserve experiences that work together."
  },
  {
    icon: HeartHandshake,
    title: "People First",
    description:
      "Every design decision begins with the people who will use the platform."
  },
  {
    icon: Compass,
    title: "Purpose",
    description:
      "We focus on useful features and clear information rather than unnecessary complexity."
  }
];

function AboutPhoto({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`about-photo ${className}`}>
      {!failed ? (
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      ) : (
        <div className="about-photo-fallback">
          <GraduationCap size={48} />
          <span>Inspired by education.</span>
        </div>
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
            <div className="about-hero-copy">
              <span className="about-eyebrow">ABOUT EDUFLOW</span>

              <h1>
                A little more clarity.
                <em> A lot more possibility.</em>
              </h1>

              <p>
                EduFlow is built around a simple idea: school technology
                should bring people together, make information easier
                to understand and leave more room for what matters —
                education.
              </p>

              <div className="about-hero-actions">
                <a href="#our-story" className="about-btn about-btn-primary">
                  Discover Our Story
                  <ArrowRight size={19} />
                </a>

                <Link to="/features" className="about-btn about-btn-outline">
                  Explore Features
                  <ArrowUpRight size={19} />
                </Link>
              </div>

              <div className="about-hero-caption">
                <Sparkles size={19} />
                Thoughtfully designed for school communities.
              </div>
            </div>

            <div className="about-hero-visual">
              <div className="about-hero-shape"></div>

              <AboutPhoto
                src="/images/about-hero.jpg"
                alt="Students on a bright school campus"
                className="about-hero-photo"
              />

              <div className="about-hero-floating">
                <span><GraduationCap size={22} /></span>
                <div>
                  <strong>Better school days</strong>
                  <small>Begin with thoughtful ideas.</small>
                </div>
              </div>

              <span className="about-hero-decoration">
                Better tools.
                <br />
                Brighter futures. ↗
              </span>
            </div>
          </div>
        </section>

        {/* VALUES */}

        <section className="about-values">
          <div className="about-container">
            <div className="about-section-heading">
              <span className="about-eyebrow">WHAT DRIVES US</span>

              <h2>
                The thinking behind
                <em> EduFlow.</em>
              </h2>

              <p>
                Four simple principles guide the way we approach
                this school-management concept.
              </p>
            </div>

            <div className="about-values-grid">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <article className="about-value" key={value.title}>
                    <span className="about-value-icon">
                      <Icon size={26} />
                    </span>

                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* STORY */}

        <section className="about-story" id="our-story">
          <div className="about-container about-story-grid">
            <div className="about-story-visual">
              <AboutPhoto
                src="/images/about-story.jpg"
                alt="Teacher helping students during a classroom activity"
                className="about-story-photo"
              />

              <div className="about-story-note">
                <span><BookOpen size={22} /></span>
                <div>
                  <strong>Education comes first.</strong>
                  <small>Technology should support it.</small>
                </div>
              </div>
            </div>

            <div className="about-story-copy">
              <span className="about-eyebrow">OUR STORY</span>

              <h2>
                It started with
                <em> one simple question.</em>
              </h2>

              <p className="about-story-question">
                What if managing everyday school activities
                could feel less complicated?
              </p>

              <p>
                Students, teachers, parents and administrators all
                depend on clear information. Yet each has different
                responsibilities and needs.
              </p>

              <p>
                EduFlow began as a frontend project concept to explore
                how those everyday experiences could come together
                through one organized and approachable platform.
              </p>

              <div className="about-story-checks">
                <span><Check size={17} /> Simple, readable interfaces</span>
                <span><Check size={17} /> Clear school information</span>
                <span><Check size={17} /> Experiences for different roles</span>
              </div>

              <Link to="/features" className="about-text-link">
                Discover the Platform
                <ArrowRight size={19} />
              </Link>
            </div>
          </div>
        </section>

        {/* MISSION AND VISION */}

        <section className="about-purpose">
          <div className="about-container">
            <div className="about-purpose-heading">
              <span className="about-eyebrow">OUR DIRECTION</span>

              <h2>
                A simple purpose.
                <em> A meaningful vision.</em>
              </h2>
            </div>

            <div className="about-purpose-grid">
              <article className="about-purpose-card">
                <div className="about-purpose-top">
                  <span className="about-purpose-icon">
                    <Compass size={27} />
                  </span>
                  <small>01 / MISSION</small>
                </div>

                <h3>Make school life simpler.</h3>

                <p>
                  Explore a more organized digital experience that
                  makes important school information easier to
                  find, follow and understand.
                </p>
              </article>

              <article className="about-purpose-card about-purpose-yellow">
                <div className="about-purpose-top">
                  <span className="about-purpose-icon">
                    <GraduationCap size={28} />
                  </span>
                  <small>02 / VISION</small>
                </div>

                <h3>Make room for better learning.</h3>

                <p>
                  Imagine a more connected school experience where
                  thoughtful technology supports the entire
                  education community.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* PEOPLE */}

        <section className="about-community">
          <div className="about-container about-community-grid">
            <div className="about-community-copy">
              <span className="about-eyebrow">WHO WE DESIGN FOR</span>

              <h2>
                Different people.
                <em> One school community.</em>
              </h2>

              <p>
                EduFlow explores how the right information can be
                presented to the right people through a clear,
                consistent digital experience.
              </p>

              <div className="about-community-roles">
                <span><GraduationCap size={20} /> Students</span>
                <span><BookOpen size={20} /> Teachers</span>
                <span><Users size={20} /> Parents</span>
                <span><School size={20} /> Administrators</span>
              </div>

              <Link to="/features" className="about-btn about-btn-primary">
                See Our Features
                <ArrowUpRight size={19} />
              </Link>
            </div>

            <div className="about-community-graphic">
              <div className="about-community-orbit"></div>

              <div className="about-community-centre">
                <GraduationCap size={35} />
                <strong>eduflow.</strong>
                <small>One connected vision</small>
              </div>

              <span className="about-community-chip chip-one">
                <BookOpen size={18} /> Teachers
              </span>

              <span className="about-community-chip chip-two">
                <Users size={18} /> Parents
              </span>

              <span className="about-community-chip chip-three">
                <GraduationCap size={18} /> Students
              </span>

              <span className="about-community-chip chip-four">
                <School size={18} /> Admin
              </span>
            </div>
          </div>
        </section>

        {/* CTA */}

        <section className="about-final">
          <div className="about-container about-final-inner">
            <div>
              <span className="about-eyebrow">LET'S CONNECT</span>

              <h2>
                Have an idea?
                <em> We'd love to hear it.</em>
              </h2>

              <p>
                Explore the EduFlow concept or share your thoughts
                about how school technology could be better.
              </p>
            </div>

            <Link to="/contact" className="about-btn about-btn-primary">
              Get in Touch
              <ArrowUpRight size={19} />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
