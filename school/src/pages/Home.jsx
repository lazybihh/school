import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Images,
  MapPin,
  Newspaper,
  School,
  Users
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LocalImage from "../components/LocalImage";
import { PageBannerTags } from "../components/PageBanner";
import "./Home.css";

/*
  All images are LOCAL.
  Put your approved VEDA photographs in public/images.
  No external image URLs are used.
*/

const slides = [
  {
    image: "/images/banner1.png",
    alt: "VEDA International School campus at sunset",
    tag: "WELCOME TO VEDA",
    caption: "A Place to Learn. A Future to Build."
  },
  {
    image: "/images/banner2.png",
    alt: "VEDA students learning together in the library",
    tag: "DISCOVER THE JOY OF LEARNING",
    caption: "Curious Minds. Bright Possibilities."
  },
  {
    image: "/images/banner3.png",
    alt: "VEDA students running on the school athletics track",
    tag: "LEARNING BEYOND BOOKS",
    caption: "Every Interest. Every Opportunity."
  }
];

/*
  These are navigation examples, not dated official notices.
  Replace them with approved announcements when available.
*/

const notices = [
  {
    category: "ADMISSIONS",
    title: "Admission Information",
    description: "Find information about joining VEDA International School.",
    link: "/admissions"
  },
  {
    category: "SCHOOL NEWS",
    title: "School News & Announcements",
    description: "Visit the news page for school-related information.",
    link: "/blog-news"
  },
  {
    category: "SCHOOL ACTIVITIES",
    title: "Explore Our School Gallery",
    description: "Discover moments and activities from school life.",
    link: "/gallery"
  },
  {
    category: "ADMISSION ENQUIRY",
    title: "Send Us Your Enquiry",
    description: "Have questions about admission? Submit an enquiry to the school.",
    link: "/admissions#enquiry"
  },
  {
    category: "CONTACT",
    title: "Contact & Location",
    description: "Find the school address, contact details and map.",
    link: "/contact"
  }
];

const importantLinks = [
  {
    icon: ClipboardList,
    title: "Admissions",
    description: "Admission information",
    link: "/admissions"
  },
  {
    icon: School,
    title: "About VEDA",
    description: "Our school and vision",
    link: "/about"
  },
  {
    icon: Newspaper,
    title: "Blog & News",
    description: "School updates",
    link: "/blog-news"
  },
  {
    icon: Images,
    title: "Photo Gallery",
    description: "Moments at VEDA",
    link: "/gallery"
  },
  {
    icon: Users,
    title: "School Portal",
    description: "Access your dashboard",
    link: "/login"
  },
  {
    icon: MapPin,
    title: "Contact Us",
    description: "Reach our school",
    link: "/contact"
  }
];

function Home() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setReducedMotion(motionPreference.matches);
    };

    motionPreference.addEventListener("change", updateMotionPreference);
    return () => {
      motionPreference.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) {
      return;
    }

    const timer = setInterval(() => {
      setActive((previous) => (previous + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [paused, reducedMotion]);

  const next = () => setActive((previous) => (previous + 1) % slides.length);

  const previous = () =>
    setActive((current) => (current - 1 + slides.length) % slides.length);

  return (
    <>
      <Navbar />

      <main className="veda-home">

        {/* 1. MAIN BANNER: clear photographs, text only as small tags */}

        <section
          className="vh-hero"
          aria-label="VEDA school banners"
          aria-roledescription="carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
        >
          <div className="vh-hero-stage">
            {slides.map((slide, index) => (
              <div
                className={`vh-hero-picture ${active === index ? "active" : ""}`}
                key={slide.image}
                aria-hidden={active !== index}
              >
                <LocalImage
                  src={slide.image}
                  alt={slide.alt}
                  className="vh-image-holder"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}

            <PageBannerTags
              label={slides[active].tag}
              caption={slides[active].caption}
            />
          </div>

          <div className="vh-hero-controls">
            <div className="vh-container vh-hero-controls-inner">
              <div className="vh-hero-indicators">
                {slides.map((slide, index) => (
                  <button
                    key={slide.image}
                    type="button"
                    className={active === index ? "active" : ""}
                    onClick={() => setActive(index)}
                    aria-label={`Show slide ${index + 1}`}
                    aria-current={active === index ? "true" : undefined}
                  >
                    0{index + 1}
                  </button>
                ))}
              </div>

              <div className="vh-hero-arrows">
                <button type="button" onClick={previous} aria-label="Previous slide">
                  <ChevronLeft size={19} />
                </button>
                <button type="button" onClick={next} aria-label="Next slide">
                  <ChevronRight size={19} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SCHOOL HIGHLIGHTS: principal's message */}

        <section className="vh-highlights">
          <div className="vh-container">

            <div className="vh-section-heading">
              <div>
                <div className="vh-eyebrow">
                  <span />
                  DISCOVER OUR SCHOOL
                </div>

                <h2>
                  An Experience Beyond
                  <br />
                  <em>the Classroom.</em>
                </h2>
              </div>

              <div className="vh-section-aside">
                <p>
                  School life is made meaningful by the people,
                  experiences and opportunities that shape each
                  student's journey.
                </p>

                <Link to="/about" className="vh-text-link">
                  Get to Know VEDA <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>

            <div className="vh-school-story">
              <LocalImage
                src="/images/veda-principal.jpg"
                alt="Principal of VEDA International School"
                className="vh-principal-photo"
                loading="lazy"
              />

              <div className="vh-school-story-content">
                <div className="vh-eyebrow">
                  <span />
                  A MESSAGE FROM THE PRINCIPAL
                </div>

                <h3>
                  Education Begins with
                  <br />
                  <em>Purpose & Care.</em>
                </h3>

                <p>
                  At VEDA, we aim to create an environment where
                  learning inspires curiosity, values guide
                  decisions and students are encouraged to
                  develop their individual potential.
                </p>

                <div className="vh-principal-signature">
                  <span className="vh-signature-line" />
                  <div>
                    <strong>Principal's Message</strong>
                    <small>VEDA International School</small>
                  </div>
                </div>

                <Link to="/about" className="vh-text-link">
                  Read More About Our School
                  <ArrowUpRight size={17} />
                </Link>
              </div>

              <div className="vh-story-mark" aria-hidden="true">“</div>
            </div>

            <div className="vh-teacher-strip">
              <div className="vh-teacher-strip-icon">
                <Users size={26} strokeWidth={1.6} />
              </div>

              <div>
                <h3>Meet the People Behind Every Lesson</h3>
                <p>
                  Learn more about our educators and the school community.
                </p>
              </div>

              <Link to="/about" className="vh-text-link">
                Explore Our School <ArrowUpRight size={17} />
              </Link>
            </div>

          </div>
        </section>

        {/* 3. LATEST NOTICES: auto-scrolling, pauses on hover */}

        <section className="vh-notices">
          <div className="vh-container vh-notices-layout">
            <div className="vh-notices-main">
              <div className="vh-eyebrow">
                <span />
                STAY INFORMED
              </div>

              <div className="vh-notices-title">
                <h2>Latest <em>Notices.</em></h2>
                <Link to="/blog-news" className="vh-text-link">
                  View All <ArrowUpRight size={17} />
                </Link>
              </div>

              <p className="vh-notices-intro">
                Important school information, news and activities
                in one convenient place.
              </p>

              <div
                className="vh-notice-viewport"
                style={{ "--vh-notice-duration": `${notices.length * 6}s` }}
              >
                <div className="vh-notice-track">
                  {[0, 1].map((copy) => (
                    <div
                      className="vh-notice-list"
                      key={copy}
                      aria-hidden={copy === 1 ? "true" : undefined}
                    >
                      {notices.map((notice) => (
                        <Link
                          className="vh-notice"
                          to={notice.link}
                          key={notice.title}
                          tabIndex={copy === 1 ? -1 : undefined}
                        >
                          <div className="vh-notice-icon">
                            <Bell size={19} />
                          </div>

                          <div className="vh-notice-details">
                            <span>{notice.category}</span>
                            <h3>{notice.title}</h3>
                            <p>{notice.description}</p>
                          </div>

                          <ArrowUpRight size={18} className="vh-notice-arrow" />
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="vh-notices-visual">
              <LocalImage
                src="/images/veda-notices.jpg"
                alt="VEDA school community"
                className="vh-image-holder"
                loading="lazy"
              />

              <div className="vh-notices-caption">
                <CalendarDays size={21} />
                <div>
                  <span>STAY CONNECTED</span>
                  <strong>What's Happening at VEDA?</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ADMISSION UPDATES */}

        <section className="vh-admissions">
          <div className="vh-container">
            <div className="vh-admission-panel">
              <div className="vh-admission-copy">
                <div className="vh-eyebrow light">
                  <span />
                  YOUR JOURNEY STARTS HERE
                </div>

                <h2>
                  Discover Your
                  <br />
                  <em>Next Chapter.</em>
                </h2>

                <p>
                  Interested in becoming part of the VEDA school
                  community? Find information about the admission
                  process and get in touch with our school.
                </p>

                <div className="vh-admission-actions">
                  <Link to="/admissions" className="vh-btn gold">
                    Explore Admissions <ArrowUpRight size={18} />
                  </Link>

                  <Link to="/contact" className="vh-admission-link">
                    Contact Us <ArrowRight size={17} />
                  </Link>
                </div>
              </div>

              <LocalImage
                src="/images/veda-admissions.jpg"
                alt="VEDA school admission photograph"
                className="vh-admission-photo"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* 5. IMPORTANT LINKS */}

        <section className="vh-important">
          <div className="vh-container">
            <div className="vh-section-heading">
              <div>
                <div className="vh-eyebrow">
                  <span />
                  QUICK ACCESS
                </div>

                <h2>Important <em>Links.</em></h2>
              </div>

              <p className="vh-important-intro">
                Find the information you need and explore
                more of VEDA International School.
              </p>
            </div>

            <div className="vh-links-grid">
              {importantLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link className="vh-link-card" to={item.link} key={item.title}>
                    <div className="vh-link-icon">
                      <Icon size={23} strokeWidth={1.7} />
                    </div>

                    <div className="vh-link-details">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <ArrowUpRight size={18} className="vh-link-arrow" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

export default Home;