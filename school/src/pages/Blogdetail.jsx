
import React from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  BookOpen
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageBanner from "../components/PageBanner";

import { blogs } from "./Blog";
import "./BlogDetail.css";

function BlogDetail() {
  const { slug } = useParams();

  const blog = blogs.find((item) => item.slug === slug);

  /* ARTICLE NOT FOUND */

  if (!blog) {
    return (
      <>
        <Navbar />

        <main className="veda-blog-detail">
          <PageBanner
            image="/images/hero.png"
            alt="VEDA International School"
            label="VEDA JOURNAL"
            caption="Story not found"
            breadcrumb={[
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: "Story not found" }
            ]}
          />

          <section className="bd-not-found bd-container">
            <BookOpen size={42} strokeWidth={1.4} />

            <h1>Story Not Found</h1>

            <p>
              This article is unavailable or may have been moved.
              Explore the journal to discover more stories.
            </p>

            <Link to="/blog" className="bd-primary-button">
              <ArrowLeft size={17} />
              Back to All Stories
            </Link>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  /* RELATED STORIES */

  const relatedBlogs = blogs
    .filter((item) => item.id !== blog.id)
    .sort((a, b) => {
      const aMatch = a.category === blog.category ? 1 : 0;
      const bMatch = b.category === blog.category ? 1 : 0;

      return bMatch - aMatch;
    })
    .slice(0, 4);

  return (
    <>
      <Navbar />

      <main className="veda-blog-detail">

        {/* EXISTING PAGE BANNER */}

        <PageBanner
          image="/images/hero.png"
          alt="VEDA International School"
          label="VEDA JOURNAL"
          caption={blog.title}
          breadcrumb={[
            { label: "Home", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: blog.category }
          ]}
        />

        {/* ARTICLE TITLE */}

        <section className="bd-intro">
          <div className="bd-container">

            <div className="bd-intro-content">

              <span className="bd-eyebrow">
                <span className="bd-eyebrow-line" />
                THE VEDA JOURNAL
              </span>

              <h1>{blog.title}</h1>

              <div className="bd-article-meta">

                <span className="bd-category">
                  {blog.category}
                </span>

                <span className="bd-date">
                  <CalendarDays size={16} />
                  {blog.date}
                </span>

                {blog.readTime && (
                  <span className="bd-date">
                    <Clock3 size={16} />
                    {blog.readTime}
                  </span>
                )}

              </div>

            </div>

          </div>
        </section>

        {/* MAIN ARTICLE AND SIDEBAR */}

        <section className="bd-main-section">
          <div className="bd-container bd-layout">

            {/* MAIN ARTICLE */}

            <article className="bd-article-card">

              <div className="bd-cover">
                <img
                  src={blog.image}
                  alt={blog.title}
                />

                <span className="bd-cover-label">
                  VEDA JOURNAL
                </span>
              </div>

              <div className="bd-article-body">

                <div className="bd-body-heading">
                  <span className="bd-small-line" />
                  THE STORY
                </div>

                <p className="bd-introduction">
                  {blog.description}
                </p>

                <div className="bd-article-text">
                  {blog.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* ARTICLE FOOTER */}

                <div className="bd-article-bottom">

                  <div className="bd-bottom-brand">
                    <div className="bd-brand-icon">
                      <BookOpen size={21} strokeWidth={1.5} />
                    </div>

                    <div>
                      <strong>VEDA Journal</strong>
                      <span>Learn · Grow · Lead</span>
                    </div>
                  </div>

                  <Link to="/blog" className="bd-primary-button">
                    <ArrowLeft size={17} />
                    Back to All Stories
                  </Link>

                </div>

              </div>
            </article>

            {/* STICKY RELATED BLOGS */}

            <aside
              className="bd-sidebar"
              aria-label="Related blog articles"
            >
              <div className="bd-related-box">

                <div className="bd-sidebar-heading">

                  <span className="bd-eyebrow">
                    <span className="bd-eyebrow-line" />
                    KEEP EXPLORING
                  </span>

                  <h2>Related Blogs<span>.</span></h2>

                  <p>
                    More stories worth discovering from our journal.
                  </p>

                </div>

                <div className="bd-related-list">

                  {relatedBlogs.map((item) => (
                    <Link
                      key={item.id}
                      to={`/blog/${item.slug}`}
                      className="bd-related-card"
                    >

                      <div className="bd-related-image">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                        />
                      </div>

                      <div className="bd-related-content">

                        <span className="bd-related-category">
                          {item.category}
                        </span>

                        <h3>{item.title}</h3>

                        <span className="bd-related-read">
                          Read Story
                          <ArrowUpRight size={15} />
                        </span>

                      </div>

                    </Link>
                  ))}

                </div>

                <Link to="/blog" className="bd-view-all">
                  Explore All Stories
                  <ArrowRight size={17} />
                </Link>

              </div>
            </aside>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default BlogDetail;
