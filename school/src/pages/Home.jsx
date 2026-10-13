
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  School,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

const audiences = [
  {
    icon: GraduationCap,
    title: "For Students",
    text: "Find schedules, assignments and important school updates in one place."
  },
  {
    icon: BookOpen,
    title: "For Teachers",
    text: "Explore simpler ways to organize classes and everyday academic tasks."
  },
  {
    icon: Users,
    title: "For Parents",
    text: "Stay connected with the information that matters to your child's education."
  },
  {
    icon: School,
    title: "For Administrators",
    text: "See how a more organized platform could support school operations."
  }
];

const features = [
  {
    icon: CalendarDays,
    title: "Attendance",
    text: "A clearer view of everyday attendance records."
  },
  {
    icon: ClipboardList,
    title: "Assignments",
    text: "Keep classroom tasks organized and easy to follow."
  },
  {
    icon: MessageSquare,
    title: "Communication",
    text: "Bring important announcements into one familiar space."
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    text: "See relevant information without unnecessary complexity."
  }
];

const faqs = [
  {
    question: "What is EduFlow?",
    answer:
      "EduFlow is a frontend school-management website concept designed to demonstrate a clearer digital experience for school communities."
  },
  {
    question: "Does the website store real school information?",
    answer:
      "No. The current project uses illustrative content and frontend interactions. It does not connect to a live school database."
  },
  {
    question: "Who is EduFlow designed for?",
    answer:
      "The concept explores experiences for students, teachers, parents and school administrators."
  }
];

function Photo({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`home-photo ${className}`}>
      {!failed ? (
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      ) : (
        <div className="home-photo-fallback">
          <GraduationCap size={45} />
          <span>Learning creates possibilities.</span>
        </div>
      )}
    </div>
  );
}

function DashboardPreview() {
  const bars = [43, 62, 54, 80, 67, 91, 75];

  return (
    <div className="home-dashboard">
      <aside className="home-dashboard-side">
        <div className="home-dashboard-brand">
          <GraduationCap size={20} />
          <strong>eduflow.</strong>
        </div>

        <span className="home-dashboard-active">
          <LayoutDashboard size={16} />
          Dashboard
        </span>

        <span><BookOpen size={16} /> Classes</span>
        <span><ClipboardList size={16} /> Assignments</span>
        <span><CalendarDays size={16} /> Calendar</span>
        <span><MessageSquare size={16} /> Messages</span>
      </aside>

      <div className="home-dashboard-main">
        <div className="home-dashboard-heading">
          <div>
            <small>STUDENT OVERVIEW</small>
            <h3>Welcome back, Sarah 👋</h3>
            <p>Here's what is happening in your school today.</p>
          </div>

          <span className="home-dashboard-avatar">S</span>
        </div>

        <div className="home-dashboard-stats">
          <div>
            <CalendarDays size={19} />
            <strong>03</strong>
            <span>Upcoming Classes</span>
          </div>

          <div>
            <ClipboardList size={19} />
            <strong>02</strong>
            <span>Assignments Due</span>
          </div>

          <div>
            <TrendingUp size={19} />
            <strong>94%</strong>
            <span>Attendance</span>
          </div>
        </div>

        <div className="home-dashboard-lower">
          <div className="home-dashboard-chart">
            <div className="home-dashboard-widget-title">
              <strong>Learning Activity</strong>
              <small>This week</small>
            </div>

            <div className="home-dashboard-bars">
              {bars.map((height, index) => (
                <div key={index}>
                  <span style={{ height: `${height}%` }}></span>
                  <small>{"MTWTFSS"[index]}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="home-dashboard-notices">
            <strong>Announcements</strong>

            <p>
              <span></span>
              School Science Fair
            </p>

            <p>
              <span></span>
              Parent Meeting
            </p>

            <p>
              <span></span>
              Holiday Notice
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Navbar />

      <main className="home-page">

        {/* HERO */}

        <section className="home-hero" id="home">
          <div className="home-hero-glow" aria-hidden="true"></div>
          <div className="home-container home-hero-grid">
            <div className="home-hero-copy">
              <span className="home-eyebrow">
                <Sparkles size={14} />
                A CALMER WAY TO RUN SCHOOL
              </span>

              <h1>
                School life,
                <em> in sync.</em>
              </h1>

              <p>
                Bring students, teachers, families, and school teams
                together with one clear, connected experience.
              </p>

              <div className="home-hero-actions">
                <Link to="/contact" className="home-btn home-btn-primary">
                  Request a Demo
                  <ArrowRight size={19} />
                </Link>

                <Link to="/features" className="home-btn home-btn-outline">
                  Explore Features
                  <ArrowUpRight size={19} />
                </Link>
              </div>

              <div className="home-hero-highlights">
                <span><Check size={16} /> Built around people</span>
                <span><Check size={16} /> Everything in clear view</span>
              </div>
            </div>

            <div className="home-hero-visual">
              <div className="home-hero-image-frame">
                <span className="home-hero-image-accent" aria-hidden="true"></span>
                <Photo
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85"
                  alt="Students learning together in a bright classroom"
                  className="home-hero-photo"
                />
                <div className="home-hero-image-caption">
                  <GraduationCap size={19} />
                  <span>Room to learn. Space to grow.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AUDIENCES */}

        <section className="home-audience" id="solutions">
          <div className="home-container">
            <div className="home-section-top">
              <div>
                <span className="home-eyebrow">WHY EDUFLOW?</span>

                <h2>
                  Built for every member of the
                  <em> school community.</em>
                </h2>
              </div>

              <p>
                Different people, different needs — brought together
                through one thoughtful digital experience.
              </p>
            </div>

            <div className="home-audience-grid">
              {audiences.map((item) => {
                const Icon = item.icon;

                return (
                  <article className="home-audience-card" key={item.title}>
                    <span className="home-audience-icon">
                      <Icon size={25} />
                    </span>

                    <h3>{item.title}</h3>
                    <p>{item.text}</p>

                    <Link to="/features" aria-label={`Explore ${item.title}`}>
                      <ArrowRight size={18} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PLATFORM PREVIEW */}

        <section className="home-platform" id="showcase">
          <div className="home-container home-platform-grid">
            <div className="home-platform-visual">
              <DashboardPreview />

              <div className="home-platform-note">
                <TrendingUp size={19} />
                <div>
                  <strong>A clearer overview</strong>
                  <small>Everything important, thoughtfully arranged.</small>
                </div>
              </div>

              <small className="home-sample-note">
                Illustrative interface with fictional sample data.
              </small>
            </div>

            <div className="home-platform-copy">
              <span className="home-eyebrow">MEET THE PLATFORM</span>

              <h2>
                Simple. Intuitive.
                <em> Powerful.</em>
              </h2>

              <p>
                A thoughtfully designed dashboard can make school
                information easier to understand. EduFlow explores
                how everyday activities can feel organized rather
                than overwhelming.
              </p>

              <div className="home-checks">
                <span><Check size={17} /> Clear navigation</span>
                <span><Check size={17} /> Organized information</span>
                <span><Check size={17} /> Role-focused experiences</span>
              </div>

              <Link to="/features" className="home-btn home-btn-primary">
                Explore the Platform
                <ArrowRight size={19} />
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES */}

        <section className="home-features" id="features">
          <div className="home-container">
            <div className="home-centered-heading">
              <span className="home-eyebrow">WHAT'S INSIDE</span>

              <h2>
                Thoughtful features for
                <em> everyday school life.</em>
              </h2>

              <p>
                Explore the proposed modules that bring important
                school activities into one easy-to-follow experience.
              </p>
            </div>

            <div className="home-features-grid">
              {features.map((item) => {
                const Icon = item.icon;

                return (
                  <article className="home-feature" key={item.title}>
                    <div className="home-feature-icon">
                      <Icon size={25} />
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.text}</p>

                    <Link to="/features">
                      Learn more <ArrowUpRight size={17} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}

        <section className="home-process" id="how-it-works">
          <div className="home-container">
            <div className="home-centered-heading">
              <span className="home-eyebrow">THE EXPERIENCE</span>

              <h2>
                Getting around should feel
                <em> effortless.</em>
              </h2>
            </div>

            <div className="home-process-grid">
              <div>
                <span>01</span>
                <h3>Choose your role</h3>
                <p>Explore an experience designed around different school users.</p>
              </div>

              <div>
                <span>02</span>
                <h3>Find what matters</h3>
                <p>Navigate relevant information through organized screens.</p>
              </div>

              <div>
                <span>03</span>
                <h3>Stay connected</h3>
                <p>See how everyday school activities can come together.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}

        <section className="home-faq">
          <div className="home-container home-faq-grid">
            <div>
              <span className="home-eyebrow">GOOD TO KNOW</span>

              <h2>
                A few common
                <em> questions.</em>
              </h2>

              <p>
                Want to know more about our project? Here are a few
                helpful answers.
              </p>

              <Link to="/contact" className="home-text-link">
                Contact Us <ArrowUpRight size={18} />
              </Link>
            </div>

            <div className="home-faq-list">
              {faqs.map((item, index) => (
                <div className="home-faq-item" key={item.question}>
                  <button
                    type="button"
                    aria-expanded={openFaq === index}
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                  >
                    {item.question}

                    <ChevronDown
                      size={19}
                      className={openFaq === index ? "rotated" : ""}
                    />
                  </button>

                  {openFaq === index && <p>{item.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}

        <section className="home-final">
          <div className="home-container home-final-grid">
            <div className="home-final-copy">
              <span>LET'S BUILD A BRIGHTER FUTURE</span>

              <h2>
                Ready to simplify your
                <em> school experience?</em>
              </h2>

              <p>
                Explore a more thoughtful approach to school management
                and share your feedback about EduFlow.
              </p>

              <div className="home-final-actions">
                <Link to="/contact" className="home-btn home-btn-yellow">
                  Get in Touch <ArrowRight size={19} />
                </Link>

                <Link to="/about" className="home-btn home-btn-light-outline">
                  Learn About Us <ArrowUpRight size={19} />
                </Link>
              </div>
            </div>

            <div className="home-final-visual">
              <div className="home-final-shape"></div>

              <Photo
                src="/images/home-community.jpg"
                alt="Students learning together around a laptop"
                className="home-final-photo"
              />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
