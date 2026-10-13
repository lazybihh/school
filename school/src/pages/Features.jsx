
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarCheck2,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock3,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  ShieldCheck,
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
      "Bring essential student information into one organized space. EduFlow's proposed student module is designed to make records easier to view, manage and understand.",
    points: [
      "Organized student profiles",
      "Class and section information",
      "Admission and enrollment overview"
    ],
    image: "/images/feature-students.jpg",
    alt: "Students participating in classroom learning",
    theme: "blue"
  },
  {
    number: "02",
    icon: CalendarCheck2,
    title: "Smart Attendance",
    description:
      "Make daily attendance a more straightforward part of the school routine with a clear interface for reviewing student presence and attendance records.",
    points: [
      "Daily attendance overview",
      "Class-wise attendance records",
      "Easy-to-read attendance summaries"
    ],
    image: "/images/feature-attendance.jpg",
    alt: "Teacher working with students in a classroom",
    theme: "yellow"
  },
  {
    number: "03",
    icon: Wallet,
    title: "Fee Management",
    description:
      "A proposed financial overview that helps school administrators keep fee information organized and quickly identify pending and completed payments.",
    points: [
      "Student fee records",
      "Payment status overview",
      "Pending fee summaries"
    ],
    image: "/images/feature-fees.jpg",
    alt: "School documents and a laptop on a desk",
    theme: "blue"
  },
  {
    number: "04",
    icon: BookOpen,
    title: "Academics & Exams",
    description:
      "Keep academic activities connected through a structured space for subjects, assessments, examinations and student performance information.",
    points: [
      "Subject organization",
      "Exam and assessment details",
      "Student result overview"
    ],
    image: "/images/feature-academics.jpg",
    alt: "Books and study materials on a desk",
    theme: "yellow"
  },
  {
    number: "05",
    icon: Megaphone,
    title: "Announcements",
    description:
      "Create a central place for important school updates so different members of the school community can stay informed.",
    points: [
      "School-wide announcements",
      "Important notices",
      "Organized communication updates"
    ],
    image: "/images/feature-announcements.jpg",
    alt: "Bright educational classroom environment",
    theme: "blue"
  },
  {
    number: "06",
    icon: ClipboardList,
    title: "Class Timetables",
    description:
      "Present daily and weekly class schedules in a clear format that helps teachers and students understand their school routines.",
    points: [
      "Class-wise timetables",
      "Subject and period information",
      "Weekly schedule overview"
    ],
    image: "/images/feature-timetable.jpg",
    alt: "Books and learning materials",
    theme: "yellow"
  }
];

const benefits = [
  {
    icon: LayoutDashboard,
    title: "One Organized Space",
    description:
      "Bring essential school activities into a more connected interface."
  },
  {
    icon: Clock3,
    title: "Simpler Workflows",
    description:
      "Make common tasks easier to follow with thoughtful layouts."
  },
  {
    icon: ShieldCheck,
    title: "Clear Information",
    description:
      "Present important records in a structured and understandable way."
  },
  {
    icon: GraduationCap,
    title: "Education Focused",
    description:
      "Design around the people and activities that shape school life."
  }
];

function FeaturePhoto({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`features-photo ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="features-photo-fallback">
          <GraduationCap size={45} />
          <span>Learning, made simpler.</span>
        </div>
      )}
    </div>
  );
}

function AttendancePreview() {
  const students = [
    { name: "Aarav Sharma", initials: "AS", status: "Present" },
    { name: "Ananya Gupta", initials: "AG", status: "Present" },
    { name: "Riya Mehta", initials: "RM", status: "Absent" },
    { name: "Kabir Verma", initials: "KV", status: "Present" }
  ];

  return (
    <div className="features-attendance-preview">
      <div className="attendance-preview-topbar">
        <span className="attendance-topbar-brand">
          <GraduationCap size={19} />
          eduflow.
        </span>

        <span className="attendance-demo-tag">DEMO PREVIEW</span>
      </div>

      <div className="attendance-preview-header">
        <div>
          <span>ACADEMIC OVERVIEW / CLASS 10-A</span>
          <h3>Class Attendance</h3>
          <p>A clearer view of your classroom.</p>
        </div>

        <span className="attendance-preview-icon">
          <CalendarCheck2 size={24} />
        </span>
      </div>

      <div className="attendance-preview-summary">
        <div>
          <small>Total Students</small>
          <strong>40</strong>
          <span>Class strength</span>
        </div>

        <div>
          <small>Present</small>
          <strong>37</strong>
          <span>Today's overview</span>
        </div>

        <div>
          <small>Absent</small>
          <strong>03</strong>
          <span>Today's overview</span>
        </div>
      </div>

      <div className="attendance-list-title">
        <strong>Student Records</strong>
        <span>Sample entries</span>
      </div>

      <div className="attendance-preview-list">
        <div className="attendance-list-heading">
          <span>STUDENT</span>
          <span>STATUS</span>
        </div>

        {students.map((student) => (
          <div className="attendance-student" key={student.name}>
            <div className="attendance-student-info">
              <span className="student-initials">
                {student.initials}
              </span>

              <strong>{student.name}</strong>
            </div>

            <span
              className={`attendance-status ${
                student.status === "Present" ? "present" : "absent"
              }`}
            >
              {student.status === "Present" && <Check size={13} />}
              {student.status}
            </span>
          </div>
        ))}
      </div>

      <div className="attendance-preview-bottom">
        <CheckCircle2 size={16} />
        Illustrative interface using fictional sample data
      </div>
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
          <div className="container features-hero-grid">
            <div className="features-hero-content">
              <span className="features-label">
                <span></span>
                EXPLORE THE PLATFORM
              </span>

              <h1>
                Everything your school needs,{" "}
                <em>working together.</em>
              </h1>

              <p>
                Discover the proposed tools behind EduFlow, designed
                to make everyday school management more organized,
                connected and easy to understand.
              </p>

              <div className="features-hero-actions">
                <a
                  href="#all-features"
                  className="features-btn features-btn-primary"
                >
                  Explore All Features
                  <ArrowUpRight size={19} />
                </a>

                <Link
                  to="/#showcase"
                  className="features-btn features-btn-outline"
                >
                  View Dashboard
                  <ArrowRight size={19} />
                </Link>
              </div>

              <div className="features-hero-highlights">
                <span><Check size={16} /> Six core modules</span>
                <span><Check size={16} /> Thoughtful interface</span>
              </div>
            </div>

            <div className="features-hero-visual">
              <div className="features-hero-background"></div>

              <FeaturePhoto
                src="/images/features-hero.jpg"
                alt="Students learning together in a classroom"
                className="features-hero-image"
              />

              <div className="features-floating-card">
                <span><Sparkles size={21} /></span>

                <div>
                  <strong>One connected platform</strong>
                  <small>Designed for better school days</small>
                </div>
              </div>

              <span className="features-hero-shape">
                <BookOpen size={25} />
              </span>

              <div className="features-hero-side-label">
                EDUCATION × TECHNOLOGY
              </div>
            </div>
          </div>
        </section>

        {/* MODULE INDEX */}

        <section className="features-intro" id="all-features">
          <div className="container">
            <div className="features-intro-heading">
              <div>
                <span className="features-label">
                  <span></span>
                  CORE MODULES
                </span>

                <h2>
                  Powerful ideas.{" "}
                  <em>Simple experiences.</em>
                </h2>
              </div>

              <p>
                Each module is designed around an important part of
                school life, with clarity and everyday convenience
                at its core.
              </p>
            </div>

            <div className="features-module-index">
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <a
                    href={`#module-${module.number}`}
                    key={module.number}
                    className="module-index-item"
                  >
                    <span className="module-index-icon">
                      <Icon size={22} />
                    </span>

                    <span className="module-index-name">
                      <small>MODULE {module.number}</small>
                      <strong>{module.title}</strong>
                    </span>

                    <ArrowUpRight
                      size={19}
                      className="module-index-arrow"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* SIX MODULES */}

        <section className="features-modules">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <div
                className={`feature-detail ${
                  index % 2 !== 0 ? "feature-detail-alt" : ""
                }`}
                id={`module-${module.number}`}
                key={module.number}
              >
                <div className="container feature-detail-grid">
                  <div className="feature-detail-content">
                    <span className="feature-detail-number">
                      FEATURE {module.number} / 06
                    </span>

                    <div className={`feature-detail-icon ${module.theme}`}>
                      <Icon size={28} />
                    </div>

                    <h2>{module.title}</h2>
                    <p>{module.description}</p>

                    <div className="feature-detail-points">
                      {module.points.map((point) => (
                        <div key={point}>
                          <span><Check size={17} /></span>
                          <strong>{point}</strong>
                        </div>
                      ))}
                    </div>

                    <a href="#all-features" className="feature-back-link">
                      View all modules
                      <ArrowUpRight size={17} />
                    </a>
                  </div>

                  <div className="feature-detail-visual">
                    <div className="feature-image-backdrop"></div>

                    <FeaturePhoto
                      src={module.image}
                      alt={module.alt}
                      className="feature-detail-photo"
                    />

                    <div className="feature-detail-overlay">
                      <span
                        className={`detail-overlay-icon ${module.theme}`}
                      >
                        <Icon size={21} />
                      </span>

                      <div>
                        <strong>{module.title}</strong>
                        <small>EduFlow platform concept</small>
                      </div>

                      <CheckCircle2
                        size={20}
                        className="detail-overlay-check"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* ATTENDANCE SHOWCASE */}

        <section className="features-interface-section">
          <div className="container features-interface-grid">
            <div className="features-interface-content">
              <span className="features-label">
                <span></span>
                DESIGNED FOR CLARITY
              </span>

              <h2>
                Important information,{" "}
                <em>beautifully organized.</em>
              </h2>

              <p>
                A useful school platform should make information
                easy to find and understand. This illustrative
                attendance screen demonstrates the kind of clear,
                practical interface we're building toward.
              </p>

              <div className="features-interface-points">
                <div>
                  <span><Check size={17} /></span>
                  Easy-to-read records
                </div>

                <div>
                  <span><Check size={17} /></span>
                  Clear status indicators
                </div>

                <div>
                  <span><Check size={17} /></span>
                  Organized class information
                </div>
              </div>

              <Link to="/#showcase" className="features-text-link">
                Explore the Dashboard Preview
                <ArrowRight size={19} />
              </Link>
            </div>

            <AttendancePreview />
          </div>
        </section>

        {/* BENEFITS */}

        <section className="features-benefits-section">
          <div className="container">
            <div className="features-centered-heading">
              <span className="features-label">
                <span></span>
                WHY IT MATTERS
              </span>

              <h2>
                Designed to make a{" "}
                <em>meaningful difference.</em>
              </h2>

              <p>
                EduFlow's design principles focus on making school
                activities feel simpler and more connected.
              </p>
            </div>

            <div className="features-benefits-grid">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <article
                    className="features-benefit"
                    key={benefit.title}
                  >
                    <div className="features-benefit-top">
                      <span><Icon size={25} /></span>
                      <small>
                        {String(index + 1).padStart(2, "0")}
                      </small>
                    </div>

                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* NEW FINAL CTA */}

        <section className="features-cta">
          <div className="container features-cta-inner">

            <div className="features-cta-content">
              <span className="features-cta-label">
                <Sparkles size={16} />
                DISCOVER WHAT'S POSSIBLE
              </span>

              <h2>
                Better connected schools.
                <em> Brighter possibilities.</em>
              </h2>

              <p>
                Bring students, teachers, parents and administrators
                closer through a thoughtfully designed school
                management experience.
              </p>

              <div className="features-cta-actions">
                <Link
                  to="/contact"
                  className="features-cta-primary"
                >
                  Get in Touch
                  <ArrowUpRight size={19} />
                </Link>

                <Link
                  to="/about"
                  className="features-cta-secondary"
                >
                  Discover Our Story
                  <ArrowRight size={19} />
                </Link>
              </div>

              <div className="features-cta-bottom">
                <span>
                  <Check size={15} />
                  Simple by design
                </span>

                <span>
                  <Check size={15} />
                  Made for school communities
                </span>
              </div>
            </div>

            <div className="features-cta-visual">
              <div className="features-cta-dashboard">

                <div className="features-cta-dashboard-top">
                  <div className="features-cta-brand">
                    <span>
                      <GraduationCap size={21} />
                    </span>

                    <strong>eduflow.</strong>
                  </div>

                  <span className="features-cta-demo">
                    CONCEPT PREVIEW
                  </span>
                </div>

                <div className="features-cta-dashboard-body">
                  <span className="features-cta-small">
                    YOUR SCHOOL, SIMPLIFIED
                  </span>

                  <h3>One place. Everything connected.</h3>

                  <div className="features-cta-dashboard-grid">
                    <div>
                      <span className="features-cta-tile-icon">
                        <Users size={23} />
                      </span>

                      <strong>Students</strong>
                      <small>Organized records</small>
                    </div>

                    <div>
                      <span className="features-cta-tile-icon">
                        <BookOpen size={23} />
                      </span>

                      <strong>Academics</strong>
                      <small>Clearer learning</small>
                    </div>

                    <div>
                      <span className="features-cta-tile-icon">
                        <CalendarCheck2 size={23} />
                      </span>

                      <strong>Attendance</strong>
                      <small>Daily overview</small>
                    </div>

                    <div>
                      <span className="features-cta-tile-icon">
                        <Megaphone size={23} />
                      </span>

                      <strong>Updates</strong>
                      <small>Stay informed</small>
                    </div>
                  </div>

                  <div className="features-cta-dashboard-footer">
                    <span>
                      <CheckCircle2 size={17} />
                      Thoughtfully connected
                    </span>

                    <ArrowUpRight size={17} />
                  </div>
                </div>
              </div>

              <div className="features-cta-floating">
                <span><Sparkles size={18} /></span>

                <div>
                  <strong>Designed around people</strong>
                  <small>Not unnecessary complexity.</small>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
