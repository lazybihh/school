
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarCheck2,
  Check,
  ClipboardList,
  GraduationCap,
  Megaphone,
  Sparkles,
  Users,
  Wallet
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Features.css";

const modules = [
  {
    number: "01",
    icon: Users,
    title: "Student Management",
    description:
      "Bring essential student information together in one organised space. EduFlow makes it easier to manage student profiles, view class information and keep school records accessible.",
    points: [
      "Organised student profiles",
      "Class and section information",
      "Student record management"
    ],
    image: "/features-students.jpeg",
    alt: "Students participating in classroom learning",
    theme: "blue"
  },
  {
    number: "02",
    icon: CalendarCheck2,
    title: "Smart Attendance",
    description:
      "Make attendance a straightforward part of the school routine. Teachers can mark student attendance, while students and parents can review the records relevant to them.",
    points: [
      "Daily attendance marking",
      "Class-wise attendance records",
      "Student attendance history"
    ],
    image: "/feature-attendance.jfif",
    alt: "Teacher working with students in a classroom",
    theme: "yellow"
  },
  {
    number: "03",
    icon: Wallet,
    title: "Fee Management",
    description:
      "Keep school fee information organised through clear records. View payment details, amounts paid and outstanding balances without searching through disconnected information.",
    points: [
      "Student fee records",
      "Paid and pending amounts",
      "Clear payment status"
    ],
    image: "/feature-fees.jfif",
    alt: "School documents and a laptop on a desk",
    theme: "blue"
  },
  {
    number: "04",
    icon: BookOpen,
    title: "Academics & Exams",
    description:
      "Connect assignments and examination results in a structured academic experience. Teachers can add classwork and marks, while students and parents can follow the shared information.",
    points: [
      "Class assignments and due dates",
      "Subject-wise examination results",
      "Connected academic records"
    ],
    image: "/feature-academics.jfif",
    alt: "Books and study materials on a desk",
    theme: "yellow"
  },
  {
    number: "05",
    icon: Megaphone,
    title: "Announcements",
    description:
      "Create a central place for important school information. Notices can be organised by audience, helping the right members of the school community stay informed.",
    points: [
      "School-wide announcements",
      "Role-specific notices",
      "One place for important updates"
    ],
    image: "/feature-announcements.jfif",
    alt: "Bright educational classroom environment",
    theme: "blue"
  },
  {
    number: "06",
    icon: ClipboardList,
    title: "Class Timetables",
    description:
      "Give students and teachers a clearer view of their schedules. Organise subjects, periods and class timetables in an easy-to-follow format.",
    points: [
      "Class-wise timetables",
      "Subject and period information",
      "Organised weekly schedules"
    ],
    image: "/feature-timetable.jfif",
    alt: "Books and learning materials",
    theme: "yellow"
  }
];

function FeaturePhoto({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`features-photo ${className}`}>
      {failed ? (
        <div className="features-photo-fallback">
          <GraduationCap size={42} />
          <span>Learning, made simpler.</span>
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

export default function Features() {
  return (
    <>
      <Navbar />

      <main className="features-page">

        {/* HERO */}

        <section className="features-hero">
          <div className="features-container features-hero-grid">

            <div className="features-hero-copy">
              <span className="features-eyebrow">
                <Sparkles size={15} />
                DISCOVER EDUFLOW
              </span>

              <h1>
                The little things matter.
                <em> Let's make school life easier.</em>
              </h1>

              <p>
                Attendance, assignments, student information,
                examinations and everyday school updates shouldn't
                feel complicated. Discover how EduFlow brings them
                together in one connected experience.
              </p>

              <div className="features-hero-actions">
                <a
                  href="#all-features"
                  className="features-btn features-btn-primary"
                >
                  Explore All Features
                  <ArrowRight size={18} />
                </a>

                <Link
                  to="/working"
                  className="features-btn features-btn-outline"
                >
                  How EduFlow Works
                  <ArrowUpRight size={18} />
                </Link>
              </div>

              <div className="features-hero-bottom">
                <span className="features-hero-bottom-icon">
                  <Check size={17} />
                </span>

                <span>
                  Six essential modules. One organised school experience.
                </span>
              </div>
            </div>

            <div className="features-hero-visual">
              <div className="features-hero-shape" />

              <FeaturePhoto
                src="/features-hero.jpeg"
                alt="Students learning together in a modern classroom"
                className="features-hero-image"
              />

              <div className="features-hero-note">
                <span>
                  <GraduationCap size={25} />
                </span>

                <div>
                  <strong>Made for better school days</strong>
                  <small>Simple tools. Meaningful connections.</small>
                </div>
              </div>

              <span className="features-hero-spark" aria-hidden="true">
                ✳
              </span>
            </div>

          </div>
        </section>

        {/* FEATURE NAVIGATION */}

        <section className="features-intro" id="all-features">
          <div className="features-container">

            <div className="features-intro-heading">
              <div>
                <span className="features-eyebrow">
                  THE PLATFORM
                </span>

                <h2>
                  Everything you need,
                  <em> thoughtfully connected.</em>
                </h2>
              </div>

              <p>
                Explore six important parts of EduFlow. Select a
                feature to learn what it does and how it supports
                everyday school activities.
              </p>
            </div>

            <div className="features-module-index">
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <a
                    href={`#module-${module.number}`}
                    className="features-index-item"
                    key={module.number}
                  >
                    <span className="features-index-icon">
                      <Icon size={23} />
                    </span>

                    <span className="features-index-name">
                      <small>MODULE {module.number}</small>
                      <strong>{module.title}</strong>
                    </span>

                    <ArrowUpRight
                      size={19}
                      className="features-index-arrow"
                    />
                  </a>
                );
              })}
            </div>

          </div>
        </section>

        {/* FEATURE DETAILS */}

        <section className="features-modules">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <article
                id={`module-${module.number}`}
                key={module.number}
                className={`features-detail ${
                  index % 2 !== 0 ? "features-detail-alt" : ""
                }`}
              >
                <div className="features-container features-detail-grid">

                  <div className="features-detail-content">
                    <span className="features-detail-label">
                      FEATURE {module.number} / 06
                    </span>

                    <span
                      className={`features-detail-icon features-${module.theme}`}
                    >
                      <Icon size={28} />
                    </span>

                    <h2>{module.title}</h2>
                    <p>{module.description}</p>

                    <ul className="features-detail-points">
                      {module.points.map((point) => (
                        <li key={point}>
                          <span>
                            <Check size={15} strokeWidth={3} />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#all-features"
                      className="features-detail-link"
                    >
                      View All Modules
                      <ArrowUpRight size={17} />
                    </a>
                  </div>

                  <div className="features-detail-visual">
                    <div className="features-detail-backdrop" />

                    <FeaturePhoto
                      src={module.image}
                      alt={module.alt}
                      className="features-detail-photo"
                    />

                    <div className="features-image-label">
                      <span>
                        <Icon size={20} />
                      </span>

                      <div>
                        <strong>{module.title}</strong>
                        <small>Part of the EduFlow experience</small>
                      </div>
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </section>

        {/* HOW FEATURES CONNECT */}

        <section className="features-connection">
          <div className="features-container features-connection-grid">

            <div className="features-connection-copy">
              <span className="features-eyebrow">
                <Sparkles size={15} />
                MORE THAN SEPARATE FEATURES
              </span>

              <h2>
                A connected experience
                <em> from classroom to home.</em>
              </h2>

              <p>
                EduFlow is designed so important information doesn't
                stay isolated in separate pages. A teacher's update
                can become useful information for students and their
                linked parents.
              </p>

              <Link
                to="/working"
                className="features-btn features-btn-primary"
              >
                Understand the Process
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="features-connection-steps">

              <div className="features-connection-step">
                <span className="features-step-number">01</span>

                <div>
                  <strong>Teachers organise information</strong>
                  <p>
                    Create assignments, record attendance and
                    update examination results.
                  </p>
                </div>
              </div>

              <div className="features-connection-step">
                <span className="features-step-number">02</span>

                <div>
                  <strong>Students follow their school day</strong>
                  <p>
                    View classwork, schedules, results and
                    relevant school notices.
                  </p>
                </div>
              </div>

              <div className="features-connection-step">
                <span className="features-step-number">03</span>

                <div>
                  <strong>Parents stay informed</strong>
                  <p>
                    Review their linked child's academic
                    information in one place.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* COMPACT CLOSING */}

        <section className="features-closing">
          <div className="features-container features-closing-inner">

            <div>
              <span>READY TO EXPLORE?</span>
              <h2>Discover the EduFlow experience.</h2>
              <p>
                Visit the demo or learn more about the platform.
              </p>
            </div>

            <div className="features-closing-actions">
              <Link to="/login" className="features-closing-primary">
                Try EduFlow
                <ArrowRight size={18} />
              </Link>

              <Link to="/solutions" className="features-closing-secondary">
                Explore Solutions
                <ArrowUpRight size={18} />
              </Link>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
