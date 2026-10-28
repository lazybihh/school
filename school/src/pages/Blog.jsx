
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  School
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageBanner from "../components/PageBanner";
import "./Blog.css";

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

const featuredStory = {
  label: "FEATURED",
  title: "Learning at VEDA International School",
  description:
    "More than a place of learning, VEDA is a community that aims to inspire curiosity, nurture values and encourage every student to grow with confidence.",
  image: "/images/veda-classroom.jpg",
  link: "/about"
};

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

function NewsTicker({ items }) {
  const shouldScroll = items.length > 3;
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
  const [showAllArticles, setShowAllArticles] = useState(false);
  const articlesGridRef = useRef(null);
  const articlesPausedRef = useRef(false);
  const dragStateRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0
  });

  // Automatic infinite scrolling, using the duplicated article set.
  useEffect(() => {
    const viewport = articlesGridRef.current;
    if (!viewport) return undefined;

    let frameId;
    let previousTime = 0;
    const speed = 24;

    const tick = (time) => {
      if (!previousTime) previousTime = time;
      const elapsed = Math.min(time - previousTime, 40);
      previousTime = time;

      const firstSet = viewport.querySelector(".bn-articles-set");
      const loopWidth = firstSet?.getBoundingClientRect().width || 0;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (
        !showAllArticles &&
        !reducedMotion &&
        !articlesPausedRef.current &&
        !dragStateRef.current.isDown &&
        loopWidth > 0
      ) {
        viewport.scrollLeft += (speed * elapsed) / 1000;

        if (viewport.scrollLeft >= loopWidth) {
          viewport.scrollLeft -= loopWidth;
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [showAllArticles]);

  const moveArticles = (direction) => {
    const viewport = articlesGridRef.current;
    if (!viewport) return;

    const firstSet = viewport.querySelector(".bn-articles-set");
    const loopWidth = firstSet?.getBoundingClientRect().width || 0;
    const step = Math.max(260, viewport.clientWidth * 0.8);

    if (direction < 0 && viewport.scrollLeft <= 2 && loopWidth > 0) {
      viewport.scrollLeft = loopWidth;
    }

    viewport.scrollBy({
      left: direction * step,
      behavior: "smooth"
    });
  };

  const visibleNews =
    filter === "All"
      ? newsItems
      : newsItems.filter((item) => item.category === filter);

  const renderArticleCard = (article) => (
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
  );

  return (
    <>
      <Navbar />

      <main className="veda-blog">
        <PageBanner
          image="/images/hero.png"
          alt="VEDA International School campus and students"
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Blog & News" }]}
        />

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

              <div className="bn-articles-heading-actions">
                <p className="bn-intro">
                  Simple ideas for parents and students to support learning at home.
                </p>
                <button
                  className="bn-text-link bn-see-all"
                  type="button"
                  onClick={() => setShowAllArticles((current) => !current)}
                  aria-expanded={showAllArticles}
                >
                  {showAllArticles ? "Show Carousel" : "See All Articles"}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            {showAllArticles ? (
              <div className="bn-articles-all">
                {articles.map(renderArticleCard)}
              </div>
            ) : (
              <div className="bn-articles-carousel">
                <button
                  className="bn-articles-arrow bn-articles-prev"
                  type="button"
                  aria-label="Previous educational articles"
                  onClick={() => moveArticles(-1)}
                >
                  <ChevronRight size={22} aria-hidden="true" />
                </button>

                <div
                  className="bn-articles-grid"
                  role="region"
                  aria-label="Educational articles"
                  tabIndex={0}
                  ref={articlesGridRef}
                  onMouseEnter={() => {
                    articlesPausedRef.current = true;
                  }}
                  onMouseLeave={() => {
                    dragStateRef.current.isDown = false;
                    articlesPausedRef.current = false;
                  }}
                  onFocus={() => {
                    articlesPausedRef.current = true;
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      articlesPausedRef.current = false;
                    }
                  }}
                  onMouseDown={(event) => {
                    if (event.button !== 0) return;
                    dragStateRef.current = {
                      isDown: true,
                      startX: event.clientX,
                      scrollLeft: event.currentTarget.scrollLeft
                    };
                    articlesPausedRef.current = true;
                  }}
                  onMouseMove={(event) => {
                    if (!dragStateRef.current.isDown) return;
                    event.preventDefault();
                    const distance =
                      event.clientX - dragStateRef.current.startX;
                    event.currentTarget.scrollLeft =
                      dragStateRef.current.scrollLeft - distance;
                  }}
                  onMouseUp={() => {
                    dragStateRef.current.isDown = false;
                  }}
                >
                  <div className="bn-articles-track">
                    {[0, 1].map((copy) => (
                      <div
                        className="bn-articles-set"
                        key={copy}
                        aria-hidden={copy === 1 ? "true" : undefined}
                      >
                        {articles.map(renderArticleCard)}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="bn-articles-arrow bn-articles-next"
                  type="button"
                  aria-label="Next educational articles"
                  onClick={() => moveArticles(1)}
                >
                  <ChevronRight size={22} aria-hidden="true" />
                </button>
              </div>
            )}

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
