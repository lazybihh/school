
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  BookOpen,
  Sparkles
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageBanner from "../components/PageBanner";
import "./Blog.css";

/*
  BLOG DATA
  Kept here to maintain your four-file requirement.
  These are sample articles, not verified school news.
*/

export const blogs = [
  {
    id: 1,
    slug: "young-minds-big-dreams",
    category: "Student Life",
    date: "October 12, 2026",
    readTime: "3 min read",
    featured: true,
    image: "/veda_blog_7_cropped/blog-1.jpg",
    title: "Small Steps, Big Dreams: Building a Brighter Future",
    description:
      "Every great journey begins with curiosity. From discovering new ideas in the classroom to building friendships and exploring individual talents, school life creates countless opportunities to learn and grow. Discover how meaningful everyday experiences inspire confidence, creativity and a lifelong love for learning.",
    content: [
      "Every meaningful learning journey begins with curiosity. When students are encouraged to explore ideas, ask questions and share their perspectives, the classroom becomes a place of discovery.",
      "At VEDA International School, we believe that education should encourage creativity, collaboration and confidence. Through engaging learning experiences, children can develop important skills that extend beyond textbooks.",
      "Small achievements, new friendships and everyday discoveries all contribute to a brighter future. Each step forward is an opportunity to learn, grow and discover new possibilities."
    ]
  },
  {
    id: 2,
    slug: "celebration-of-talent",
    category: "Events",
    date: "October 8, 2026",
    readTime: "2 min read",
    image: "/veda_blog_7_cropped/blog-2.jpg",
    title: "A Celebration of Talent and Unity",
    description:
      "Celebrating creativity, confidence and the joy of coming together through memorable school experiences.",
    content: [
      "School celebrations provide students with opportunities to express themselves, discover their interests and appreciate the talents of others.",
      "Whether through music, dance, art or collaborative activities, these experiences encourage confidence, teamwork and a sense of belonging.",
      "Every celebration reminds us that learning also happens through shared experiences and the joy of participating together."
    ]
  },
  {
    id: 3,
    slug: "learning-beyond-classrooms",
    category: "Student Life",
    date: "October 5, 2026",
    readTime: "3 min read",
    image: "/veda_blog_7_cropped/blog-3.jpg",
    title: "Learning Beyond the Classroom",
    description:
      "How exploration, practical activities and teamwork connect everyday lessons with the wider world.",
    content: [
      "Learning becomes more meaningful when students can connect classroom knowledge with practical experiences.",
      "Creative activities, group projects and opportunities for exploration help children develop problem-solving abilities and communication skills.",
      "By encouraging students to learn through experience, schools can nurture curiosity and help them become more confident learners."
    ]
  },
  {
    id: 4,
    slug: "champions-on-the-field",
    category: "Achievements",
    date: "September 28, 2026",
    readTime: "2 min read",
    image: "/veda_blog_7_cropped/blog-4.jpg",
    title: "Champions on and Off the Field",
    description:
      "Discovering the value of determination, sportsmanship and teamwork through sporting experiences.",
    content: [
      "Sports and physical activities play an important role in developing confidence, discipline and teamwork.",
      "Participating in games teaches students to appreciate effort, support their teammates and approach challenges with determination.",
      "The true value of sports extends beyond winning. It lies in building character, resilience and a positive attitude."
    ]
  },
  {
    id: 5,
    slug: "inspiring-young-minds",
    category: "School News",
    date: "September 20, 2026",
    readTime: "3 min read",
    image: "/veda_blog_7_cropped/blog-5.jpg",
    title: "Inspiring Young Minds Through New Experiences",
    description:
      "Meaningful learning experiences help children discover their interests, abilities and confidence.",
    content: [
      "A supportive learning environment encourages students to explore their potential and develop a lifelong interest in education.",
      "New experiences can introduce children to different perspectives and help them discover skills and interests they may not have recognised before.",
      "Through encouragement and thoughtful guidance, every learner can gain the confidence to embrace new opportunities."
    ]
  },
  {
    id: 6,
    slug: "creative-learning",
    category: "Student Life",
    date: "September 15, 2026",
    readTime: "2 min read",
    image: "/veda_blog_7_cropped/blog-6.jpg",
    title: "Where Creativity Meets Learning",
    description:
      "Exploring how imagination, artistic expression and hands-on activities make education more engaging.",
    content: [
      "Creativity allows students to express ideas, experiment with possibilities and approach familiar subjects in new ways.",
      "Artistic activities, imaginative projects and collaborative exercises can make learning more engaging while supporting communication and critical thinking.",
      "When creativity becomes part of everyday education, children gain more opportunities to discover and develop their individual strengths."
    ]
  },
  {
    id: 7,
    slug: "school-announcements",
    category: "Announcements",
    date: "September 10, 2026",
    readTime: "2 min read",
    image: "/veda_blog_7_cropped/blog-7.jpg",
    title: "Important Updates from Our School",
    description:
      "A dedicated space for useful school communications, upcoming activities and community information.",
    content: [
      "Clear communication helps students, parents and educators stay connected with the school community.",
      "This section can be used to share upcoming activities, important notices and other useful information.",
      "Please refer to official school communications for confirmed dates, schedules and announcements."
    ]
  }
];

const categories = [
  "All Stories",
  "School News",
  "Events",
  "Achievements",
  "Student Life",
  "Announcements"
];

function Blog() {
  const [activeCategory, setActiveCategory] = useState("All Stories");

  const featuredBlog = blogs.find((item) => item.featured);

  const regularBlogs = blogs.filter((item) => !item.featured);

  const filteredBlogs =
    activeCategory === "All Stories"
      ? regularBlogs
      : regularBlogs.filter(
          (item) => item.category === activeCategory
        );

  return (
    <>
      <Navbar />

      <main className="veda-blog">
        <PageBanner
          image="/images/hero.png"
          alt="VEDA International School campus and students"
          label="THE VEDA JOURNAL"
          caption="Stories that inspire"
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Blog" }]}
        />

        {/* PAGE INTRODUCTION */}

        <section className="vb-intro">
          <div className="vb-container vb-intro-inner">

            <div className="vb-intro-copy">
              <span className="vb-kicker">
                <span className="vb-kicker-line" />
                THE VEDA JOURNAL
              </span>

              <h1>
                Stories that <em>inspire.</em>
                
                Moments that matter.
              </h1>

              {/* <p>
                A closer look at the experiences, ideas and
                everyday moments that bring our learning
                community together.
              </p> */}
            </div>
          </div>
        </section>

        {/* FEATURED EDITORIAL STORY */}

        <section className="vb-featured-section">
          <div className="vb-container">

            <div className="vb-section-top">
              <span>01 / EDITOR'S PICK</span>
              <div />
              <span>FEATURED JOURNAL</span>
            </div>

            <article className="vb-featured">

              <Link
                className="vb-featured-photo"
                to={`/blog/${featuredBlog.slug}`}
                aria-label={`Read ${featuredBlog.title}`}
              >
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                />

                <span className="vb-photo-corner">
                  <Sparkles size={15} />
                  Featured Story
                </span>
              </Link>

              <div className="vb-featured-panel">

                <div className="vb-featured-meta">
                  <span className="vb-category">
                    {featuredBlog.category}
                  </span>

                  <span className="vb-date">
                    <CalendarDays size={15} />
                    {featuredBlog.date}
                  </span>
                </div>

                <h2>{featuredBlog.title}</h2>

                <div className="vb-gold-rule" />

                <p>{featuredBlog.description}</p>

                <div className="vb-featured-actions">

                  <Link
                    to={`/blog/${featuredBlog.slug}`}
                    className="vb-primary-link"
                  >
                    Explore This Story
                    <ArrowUpRight size={18} />
                  </Link>

                  <span className="vb-read-time">
                    <Clock3 size={15} />
                    {featuredBlog.readTime}
                  </span>

                </div>
              </div>

            </article>

          </div>
        </section>

        {/* ALL ARTICLES */}

        <section className="vb-journal-section">
          <div className="vb-container">

            <div className="vb-journal-heading">
              <div>
                <span className="vb-kicker">
                  <span className="vb-kicker-line" />
                  EXPLORE THE JOURNAL
                </span>

                <h2>Latest from VEDA<span>.</span></h2>

                {/* <p>
                  Discover new perspectives, shared experiences
                  and stories from our school community.
                </p> */}
              </div>

              <div className="vb-journal-count">
                <strong>
                  {String(filteredBlogs.length).padStart(2, "0")}
                </strong>
                <span>STORIES</span>
              </div>
            </div>

            {/* CATEGORY FILTERS */}

            <div className="vb-filter-bar">
              <div className="vb-filters" aria-label="Blog categories">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`vb-filter ${
                      activeCategory === category ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* ARTICLE GRID */}

            {filteredBlogs.length > 0 ? (
              <div className="vb-grid">

                {filteredBlogs.map((blog, index) => (
                  <article className="vb-card" key={blog.id}>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="vb-card-photo"
                      aria-label={`Read ${blog.title}`}
                    >
                      <img
                        src={blog.image}
                        alt={blog.title}
                        loading="lazy"
                      />

                      <span className="vb-card-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>

                    <div className="vb-card-body">

                      <div className="vb-card-topline">
                        <span className="vb-category">
                          {blog.category}
                        </span>

                        <span className="vb-date">
                          {blog.date}
                        </span>
                      </div>

                      <h3>
                        <Link to={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </h3>

                      <p>{blog.description}</p>

                      <div className="vb-card-bottom">

                        <span className="vb-read-time">
                          <Clock3 size={14} />
                          {blog.readTime}
                        </span>

                        <Link
                          to={`/blog/${blog.slug}`}
                          className="vb-card-arrow"
                          aria-label={`Read ${blog.title}`}
                        >
                          <ArrowUpRight size={19} />
                        </Link>

                      </div>

                    </div>

                  </article>
                ))}

              </div>
            ) : (
              <div className="vb-empty">
                <BookOpen size={34} strokeWidth={1.4} />
                <h3>No stories in this category yet.</h3>
                <p>Explore another category to discover more articles.</p>

                <button
                  type="button"
                  onClick={() => setActiveCategory("All Stories")}
                >
                  View All Stories
                  <ArrowRight size={17} />
                </button>
              </div>
            )}

          </div>
        </section>

        {/* CLOSING STRIP */}

        <section className="vb-closing">
          <div className="vb-container vb-closing-inner">

            <div>
              <span className="vb-closing-label">
                BEYOND THE CLASSROOM
              </span>

              <h2>There's always more to discover.</h2>

              <p>
                Explore the values and vision behind VEDA
                International School.
              </p>
            </div>

            <Link to="/about" className="vb-closing-link">
              Discover Our School
              <ArrowUpRight size={18} />
            </Link>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Blog;
