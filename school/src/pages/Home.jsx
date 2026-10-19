
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ClipboardCheck,
  ClipboardList,
  Clock,
  GraduationCap,
  Megaphone,
  Play,
  Sparkles,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

const IMAGES = {
  hero: "/features-students.jpeg",
  heroTeacher: "/feature-attendance.jfif",
  heroCommunity: "/home-community.jfif",
  student: "/features-students.jpeg",
  teacher: "/feature-attendance.jfif",
  parents: "/home-community.jfif",
  campus: "/features-hero.jpeg",
};

const roles = [
  {
    icon: GraduationCap,
    tone: "blue",
    title: "For Students",
    text: "Access your timetable, assignments, results and notices — all in one place.",
    link: "Explore Student Dashboard",
    href: "/solutions/student",
    image: IMAGES.student,
    alt: "Students studying together with laptops",
  },
  {
    icon: BookOpen,
    tone: "amber",
    title: "For Teachers",
    text: "Manage classes, track attendance, create assignments and share updates with ease.",
    link: "Explore Teacher Dashboard",
    href: "/solutions/teacher",
    image: IMAGES.teacher,
    alt: "Teacher guiding students in a classroom",
  },
  {
    icon: Users,
    tone: "green",
    title: "For Parents",
    text: "Stay connected with your child's attendance, performance, fees and announcements.",
    link: "Explore Parent Dashboard",
    href: "/solutions/parent",
    image: IMAGES.parents,
    alt: "Parents with their child at home",
  },
];

const platformPoints = [
  "Quick access to classes, assignments and results",
  "Shared updates and announcements",
  "A connected view of school and home",
  "A smooth experience on both desktop and mobile",
];

const steps = [
  {
    icon: ClipboardCheck,
    tone: "blue",
    title: "Teacher Posts",
    text: "The teacher adds homework, attendance or marks for the class.",
  },
  {
    icon: Bell,
    tone: "amber",
    title: "Students Receive",
    text: "Students can view shared assignments, timetables and notices in their dashboard.",
  },
  {
    icon: Users,
    tone: "green",
    title: "Parents Stay Informed",
    text: "Parents can track progress, attendance, fees and important notices.",
  },
];

const features = [
  {
    icon: CalendarDays,
    tone: "blue",
    title: "Attendance",
    text: "Track daily attendance easily.",
    href: "/features#module-02",
  },
  {
    icon: ClipboardList,
    tone: "amber",
    title: "Assignments",
    text: "Keep tasks organized and on time.",
    href: "/features#module-04",
  },
  {
    icon: Award,
    tone: "green",
    title: "Results",
    text: "Record and view examination marks.",
    href: "/features#module-04",
  },
  {
    icon: Clock,
    tone: "violet",
    title: "Timetable",
    text: "Manage class schedules and periods.",
    href: "/features#module-06",
  },
  {
    icon: Megaphone,
    tone: "rose",
    title: "Notices",
    text: "Share important updates with everyone.",
    href: "/features#module-05",
  },
];

function Photo({ src, alt = "", className = "", priority = false }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`home-photo ${className}`}>
      {failed ? (
        <div className="home-photo-fallback" aria-hidden="true">
          <GraduationCap size={36} />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  highlight,
  text,
  center = false,
}) {
  return (
    <div
      className={`home-heading ${
        center ? "home-heading-center" : ""
      }`}
    >
      <span className="home-eyebrow">{eyebrow}</span>

      <h2>
        {title} <em>{highlight}</em>
      </h2>

      {text && <p>{text}</p>}
    </div>
  );
}

/* HERO */

function Hero() {
  return (
    <section className="home-hero" id="home">
      <div className="home-container home-hero-grid">

        <div className="home-hero-copy">
          <span className="home-eyebrow">
            <Sparkles size={14} />
            Modern School Management System
          </span>

          <h1 className="home-hero-title">
            Smarter School Management for a

            <span className="home-gradient-text">
              Brighter Tomorrow

              <svg
                className="home-underline"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M3 10 Q 75 2 150 8 T 297 6" />
              </svg>
            </span>
          </h1>

          <p className="home-hero-text">
            EduFlow brings students, parents and teachers together
            in one powerful platform — making school life simpler,
            more organized and more connected.
          </p>

          <div className="home-hero-actions">
            <Link to="/contact" className="home-btn home-btn-gold">
              Contact us
              <ArrowRight size={18} />
            </Link>

            <a href="#how-it-works" className="home-btn home-btn-outline">
              <span className="home-play">
                <Play size={11} fill="currentColor" />
              </span>
              See How It Works
            </a>
          </div>
        </div>

        <div className="home-hero-visual">
          <div className="home-hero-shape" aria-hidden="true" />

          <span className="home-script" aria-hidden="true">
            Better Learning,
            <br />
            Brighter Future ♡
          </span>

          <div className="home-hero-collage">
            <Photo
              className="home-hero-photo home-hero-photo-main"
              src={IMAGES.hero}
              alt="Students learning together in a bright classroom"
              priority
            />

            <Photo
              className="home-hero-photo home-hero-photo-teacher"
              src={IMAGES.heroTeacher}
              alt="Teacher guiding students during a lesson"
              priority
            />

            <Photo
              className="home-hero-photo home-hero-photo-community"
              src={IMAGES.heroCommunity}
              alt="Families and students sharing a school community moment"
              priority
            />
          </div>

          <div className="home-float home-float-update" aria-hidden="true">
            <span className="home-icon-tile home-tone-amber">
              <Bell size={18} />
            </span>

            <div>
              <small>Sample Notice</small>
              <strong>Parent-Teacher Meeting</strong>
              <small>School announcement</small>
            </div>
          </div>

          <div className="home-float home-float-attendance" aria-hidden="true">
            <span className="home-icon-tile home-tone-green">
              <Check size={18} />
            </span>

            <div>
              <small>School Records</small>
              <strong>Attendance</strong>
              <small>Organized by student</small>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* STUDENTS, TEACHERS AND PARENTS */

function Roles() {
  return (
    <section className="home-section home-roles" id="solutions">
      <div className="home-container">

        <div className="home-split-heading">
          <SectionHeading
            eyebrow="Built for your school community"
            title="Three Roles."
            highlight="One Connected System."
            text="For students, teachers and parents, EduFlow keeps the school day informed, involved and in sync."
          />

          <Link to="/solutions" className="home-btn home-btn-outline">
            Explore Solutions
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="home-roles-grid">
          {roles.map((item) => {
            const Icon = item.icon;

            return (
              <article
                className={`home-role home-tone-${item.tone}`}
                key={item.title}
              >
                <Photo
                  className="home-role-photo"
                  src={item.image}
                  alt={item.alt}
                />

                <span className="home-role-icon">
                  <Icon size={22} />
                </span>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

                <Link to={item.href} className="home-role-link">
                  {item.link}
                  <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* CONNECTED SCHOOL EXPERIENCE */

function Platform() {
  return (
    <section className="home-section home-platform" id="showcase">
      <div className="home-container home-platform-grid">

        <div className="home-platform-visual">
          <Photo
            className="home-platform-photo"
            src={IMAGES.campus}
            alt="A welcoming modern school campus"
          />

          <div className="home-platform-photo-note">
            <span className="home-icon-tile home-tone-blue">
              <GraduationCap size={23} />
            </span>

            <div>
              <strong>One school community</strong>
              <small>Information in one connected place</small>
            </div>
          </div>
        </div>

        <div className="home-platform-copy">
          <SectionHeading
            eyebrow="A more organized school day"
            title="The important details,"
            highlight="without the confusion."
            text="A timetable should be easy to find. Homework should reach the right class. Parents should be able to follow their child's progress. EduFlow brings those everyday needs into one clear experience."
          />

          <ul className="home-checklist">
            {platformPoints.map((point) => (
              <li key={point}>
                <span className="home-check">
                  <Check size={14} strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <Link to="/features" className="home-btn home-btn-gold">
            Explore the Features
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}

/* HOW EDUFLOW WORKS */

function HowItWorks() {
  return (
    <section
      className="home-section home-how"
      id="how-it-works"
    >
      <div className="home-container home-how-grid">

        <div>
          <SectionHeading
            eyebrow="A simple journey"
            title="How"
            highlight="EduFlow Works"
            text="From homework to progress — EduFlow connects everyone in the school community."
          />

          <Link to="/working" className="home-btn home-btn-outline">
            Learn How It Works
            <ArrowRight size={18} />
          </Link>
        </div>

        <ol className="home-steps">
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
              <li
                className={`home-step home-tone-${item.tone}`}
                key={item.title}
              >
                <span className="home-step-visual">
                  <Icon size={32} />

                  <span className="home-step-num">
                    {index + 1}
                  </span>
                </span>

                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            );
          })}
        </ol>

      </div>
    </section>
  );
}

/* FEATURES */

function Features() {
  return (
    <section className="home-section home-features" id="features">
      <div className="home-container">

        <div className="home-split-heading">
          <SectionHeading
            eyebrow="Powerful features"
            title="Real Features."
            highlight="Real Impact."
            text="From attendance to results, EduFlow helps schools manage everything with ease and accuracy."
          />

          <Link to="/features" className="home-btn home-btn-outline">
            Explore All Features
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="home-features-grid">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                to={item.href}
                className={`home-feature home-tone-${item.tone}`}
                key={item.title}
              >
                <span className="home-feature-icon">
                  <Icon size={28} />
                </span>

                <h3>{item.title}</h3>
                <p>{item.text}</p>

                <span className="home-feature-more">
                  Learn more
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* A DAY WITH EDUFLOW — NEW FINAL SECTION */

function SchoolDay() {
  return (
    <section className="home-section home-day">
      <div className="home-container home-day-grid">

        <div className="home-day-visual">
          <Photo
            className="home-day-photo"
            src={IMAGES.teacher}
            alt="Teacher working with students in class"
          />

          <div className="home-day-caption">
            <GraduationCap size={20} />
            <span>Classroom to home, connected.</span>
          </div>
        </div>

        <div className="home-day-copy">
          <span className="home-eyebrow">
            <Sparkles size={14} />
            A DAY WITH EDUFLOW
          </span>

          <h2>
            School life moves forward.
            <em> Everyone stays in the loop.</em>
          </h2>

          <p className="home-day-intro">
            Here's how the shared experience works across a normal
            school day — no made-up ratings or statistics, just the
            features you can explore in our demo.
          </p>

          <div className="home-day-timeline">

            <div className="home-day-entry">
              <span className="home-day-number">01</span>

              <div>
                <strong>Teacher organizes the classroom</strong>
                <p>
                  Creates assignments, marks attendance and
                  updates examination results.
                </p>
              </div>
            </div>

            <div className="home-day-entry">
              <span className="home-day-number">02</span>

              <div>
                <strong>Student checks what's next</strong>
                <p>
                  Views class homework, timetables, attendance
                  and results in one place.
                </p>
              </div>
            </div>

            <div className="home-day-entry">
              <span className="home-day-number">03</span>

              <div>
                <strong>Parent follows their child's progress</strong>
                <p>
                  Can review the linked student's assignments,
                  attendance, results and fee status.
                </p>
              </div>
            </div>

          </div>

          <div className="home-day-actions">
            <Link to="/working" className="home-btn home-btn-gold">
              Understand the Process
              <ArrowRight size={18} />
            </Link>

            <Link to="/login" className="home-day-link">
              Try the Demo
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

/* MAIN HOME PAGE */

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="home-page">
        <Hero />
        <Roles />
        <Platform />
        <HowItWorks />
        <Features />
        <SchoolDay />
      </main>

      <Footer />
    </>
  );
}
