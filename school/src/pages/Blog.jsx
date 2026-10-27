import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  MapPin,
  School
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Blog.css";

/*
  All images are LOCAL (public/images). No external image URLs.

  SAMPLE CONTENT: the news items below point to real pages of the website.
  Replace them with approved school news when it is available.
  To show a date on an item, fill in its "date" (for example "12 Nov 2026").
  Items with an empty date simply show no date.
*/

const categories = ["All", "School News", "Announcements", "Updates"];

const newsItems = [
  {
    category: "School News",
    title: "A Message from Our Principal",
    description: "Read the principal's thoughts on learning, values and care at VEDA.",
    image: "/images/veda-principal.jpg",
    date: "",
    link: "/about"
  },
  {
    category: "Announcements",
    title: "Admission Information",
    description: "Find the admission process, eligibility and required documents.",
    image: "/images/veda-admissions.jpg",
    date: "",
    link: "/admissions"
  },
  {
    category: "Updates",
    title: "Moments from School Life",
    description: "Photographs of events, celebrations and activities at school.",
    image: "/images/veda-activities.jpg",
    date: "",
    link: "/gallery"
  },
  {
    category: "School News",
    title: "Our Campus and Classrooms",
    description: "See the campus and the learning spaces our students use.",
    image: "/images/veda-campus.jpg",
    date: "",
    link: "/gallery"
  },
  {
    category: "Announcements",
    title: "Contact the School Office",
    description: "Find the address, phone number, email and map to reach us.",
    image: "/images/highlight-teachers.jpg",
    date: "",
    link: "/contact"
  },
  {
    category: "Updates",
    title: "Send an Admission Enquiry",
    description: "Have a question about admission? Send an enquiry to the school.",
    image: "/images/veda-notices.jpg",
    date: "",
    link: "/admissions#enquiry"
  }
];

/* General learning articles for parents and students. */

const articles = [
  {
    label: "STUDY HABITS",
    title: "Building a Daily Study Routine",
    description:
      "A fixed time and a quiet place make homework easier. Short, regular sessions work better than one long one.",
    image: "/images/highlight-academics.jpg"
  },
  {
    label: "CREATIVITY",
    title: "Why Play and Creativity Matter",
    description:
      "Art, sport and free play help children express ideas, work with others and stay curious about learning.",
    image: "/images/highlight-activities.jpg"
  },
  {
    label: "READING",
    title: "Reading Together at Home",
    description:
      "Reading aloud for a few minutes each day builds vocabulary, focus and a lasting love of books.",
    image: "/images/highlight-facilities.jpg"
  },
  {
    label: "HEALTHY HABITS",
    title: "Making Time for Active Play",
    description:
      "Outdoor games and regular movement support healthy routines, confidence and teamwork.",
    image: "/images/veda-activities.jpg"
  },
  {
    label: "CREATIVE LEARNING",
    title: "Learning Through Everyday Activities",
    description:
      "Cooking, drawing and simple household projects can help children practise useful skills through hands-on discovery.",
    image: "/images/highlight-activities.jpg"
  }
];

/* The card shown beside the scrolling news list. */

const featuredStory = {
  label: "FEATURED",
  title: "Learning at VEDA International School",
  description:
    "More than a place of learning, VEDA is a community that aims to inspire curiosity, nurture values and encourage every student to grow with confidence.",
  image: "/images/veda-classroom.jpg",
  link: "/about"
};

/* Shows a branded placeholder if a photograph is missing. */

function LocalImage({ src, alt, className = "", ...props }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <div className={`bn-image-holder ${className}`}>
      {!failed ? (
        <img src={src} alt={alt} onError={() => setFailed(true)} {...props} />
      ) : (
        <div className="bn-image-placeholder" role="img" aria-label={alt}>
          <School size={26} strokeWidth={1.4} />
          <span>VEDA</span>
        </div>
      )}
    </div>
  );
}

/*
  Vertical news list.
  With more than 3 items it scrolls on its own and loops forever.
  It stops while the mouse is over it or a link has keyboard focus.
  With 3 items or fewer it is a normal static list.
*/

function NewsTicker({ items }) {
  const shouldScroll = items.length > 3;

  // The list is repeated once so the loop has no visible jump.
  const copies = shouldScroll ? [0, 1] : [0];

  return (
    <div
      className={`bn-ticker ${shouldScroll ? "is-scrolling" : ""}`}
      style={{ "--bn-duration": `${items.length * 6}s` }}
    >
      <div className="bn-ticker-track">
        {copies.map((copy) => (
          <div
            className="bn-ticker-list"
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {items.map((item) => (
              <Link
                className="bn-news-item"
                to={item.link}
                key={item.title}
                tabIndex={copy === 1 ? -1 : undefined}
              >
                <LocalImage
                  src={item.image}
                  alt={item.title}
                  className="bn-news-thumb"
                  loading="lazy"
                />

                <div className="bn-news-text">
                  <div className="bn-news-meta">
                    <span>{item.category.toUpperCase()}</span>

                    {item.date && (
                      <span className="bn-news-date">
                        <CalendarDays size={12} />
                        {item.date}
                      </span>
                    )}
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <ArrowUpRight size={18} className="bn-news-arrow" />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogNews() {
  const [filter, setFilter] = useState("All");
  const articlesGridRef = useRef(null);

  const visibleNews =
    filter === "All"
      ? newsItems
      : newsItems.filter((item) => item.category === filter);

  return (
    <>
      <Navbar />

      <main className="veda-blog">

        {/* 1. BANNER: clear photograph, text only as small tags */}

        <section className="bn-banner" aria-label="Blog and News">
          <div className="bn-banner-stage">
            <LocalImage
              src="/images/hero.png"
              alt="VEDA International School campus and students"
              className="bn-banner-photo"
              loading="eager"
            />

            <div className="bn-tag bn-tag-top-left">
              <GraduationCap size={17} />
              <strong>VEDA INTERNATIONAL SCHOOL</strong>
            </div>

            <div className="bn-tag bn-tag-top-right">
              <MapPin size={15} />
              <span>THURANA (HANSI)</span>
            </div>

            <nav className="bn-tag bn-tag-bottom-left" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <span aria-current="page">Blog & News</span>
            </nav>

            <div className="bn-tag bn-tag-center">
              <small>BLOG & NEWS</small>
              <strong>News, Stories & Updates</strong>
            </div>
          </div>
        </section>

        {/* 2. LATEST NEWS: scrolling list and featured card */}

        <section className="bn-news">
          <div className="bn-container bn-news-layout">

            <div className="bn-news-main">
              <div className="bn-eyebrow">
                <span />
                STAY INFORMED
              </div>

              <h2>
                Latest News <em>& Updates.</em>
              </h2>

              <p className="bn-intro">
                School news, announcements and updates in one place.
              </p>

              <div className="bn-filters" role="group" aria-label="Filter news">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={filter === category ? "active" : ""}
                    onClick={() => setFilter(category)}
                    aria-pressed={filter === category}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* key restarts the scroll when the filter changes */}
              <NewsTicker items={visibleNews} key={filter} />
            </div>

            <article className="bn-featured">
              <LocalImage
                src={featuredStory.image}
                alt={featuredStory.title}
                className="bn-featured-photo"
                loading="lazy"
              />

              <div className="bn-featured-body">
                <span className="bn-featured-label">{featuredStory.label}</span>
                <h3>{featuredStory.title}</h3>
                <p>{featuredStory.description}</p>

                <Link to={featuredStory.link} className="bn-text-link">
                  Know More About VEDA <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>

          </div>
        </section>

        {/* 3. EDUCATIONAL ARTICLES */}

        <section className="bn-articles">
          <div className="bn-container">

            <div className="bn-section-heading">
              <div>
                <div className="bn-eyebrow">
                  <span />
                  READ & LEARN
                </div>

                <h2>
                  Educational <em>Articles.</em>
                </h2>
              </div>

              <p className="bn-intro">
                Simple ideas for parents and students to support learning at home.
              </p>
            </div>

            <div className="bn-articles-carousel">
              <div
                className="bn-articles-grid"
                role="region"
                aria-label="Educational articles"
                tabIndex={0}
                ref={articlesGridRef}
              >
                <div className="bn-articles-track">
                  {[0, 1].map((copy) => (
                    <div
                      className="bn-articles-set"
                      key={copy}
                      aria-hidden={copy === 1 ? "true" : undefined}
                    >
                      {articles.map((article) => (
                        <article className="bn-article-card" key={article.title}>
                          <LocalImage
                            src={article.image}
                            alt={article.title}
                            className="bn-article-photo"
                            loading="lazy"
                          />

                          <div className="bn-article-body">
                            <span>{article.label}</span>
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="bn-articles-next"
                type="button"
                aria-label="Scroll to more educational articles"
                onClick={() =>
                  articlesGridRef.current?.scrollBy({
                    left: articlesGridRef.current.clientWidth * 0.8,
                    behavior: "smooth"
                  })
                }
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </div>

            {/* Closing strip */}

            <div className="bn-cta">
              <div>
                <h3>Have a question for the school?</h3>
                <p>Get in touch with us or see more of school life.</p>
              </div>

              <div className="bn-cta-actions">
                <Link to="/contact" className="bn-btn">
                  Contact Us <ArrowUpRight size={16} />
                </Link>

                <Link to="/gallery" className="bn-cta-link">
                  View Gallery
                </Link>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default BlogNews;