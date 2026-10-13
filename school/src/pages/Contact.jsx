
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  Mail,
  MessageCircle,
  Send
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

const contactCards = [
  {
    title: "Email Us",
    detail: "hello@eduflow.example",
    note: "Example address for this project",
    icon: Mail
  },
  {
    title: "Explore the Platform",
    detail: "Discover our features",
    note: "See what EduFlow is designed to do",
    icon: GraduationCap,
    link: "/features"
  },
  {
    title: "About EduFlow",
    detail: "Get to know the concept",
    note: "Learn about the project",
    icon: MessageCircle,
    link: "/about"
  }
];

const faqs = [
  {
    question: "What is EduFlow?",
    answer: "EduFlow is a frontend school-management concept designed for students, teachers, parents and administrators."
  },
  {
    question: "Can I request a demo?",
    answer: "You can explore the illustrative pages and login interface. Live demo booking is not connected yet."
  },
  {
    question: "Does this form send a message?",
    answer: "No. It demonstrates React form handling and browser validation without sending or saving personal information."
  }
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  }

  return (
    <>
      <Navbar />

      <main className="contact-page">

        <section className="contact-hero">
          <div className="contact-container contact-hero-content">
            <span className="contact-eyebrow">
              <span></span> GET IN TOUCH
            </span>

            <h1>
              We'd love to hear
              <br />
              <em>from you.</em>
            </h1>

            <p>
              Have a question, an idea or feedback about EduFlow?
              Explore our contact experience and learn more about
              the project.
            </p>

            <a href="#contact-form" className="contact-hero-button">
              Send a Message <ArrowUpRight size={18} />
            </a>

            <div className="contact-hero-handwriting">
              Better schools
              <br />
              begin with
              <br />
              better ideas.
              <span></span>
            </div>
          </div>
        </section>

        <section className="contact-details">
          <div className="contact-container contact-cards">
            {contactCards.map((card) => {
              const Icon = card.icon;

              return (
                <div className="contact-detail-card" key={card.title}>
                  <span className="contact-detail-icon">
                    <Icon size={22} />
                  </span>

                  <strong>{card.title}</strong>

                  {card.link ? (
                    <Link to={card.link} className="contact-detail-link">
                      {card.detail} <ArrowUpRight size={15} />
                    </Link>
                  ) : (
                    <span className="contact-detail-value">
                      {card.detail}
                    </span>
                  )}

                  <small>{card.note}</small>
                </div>
              );
            })}
          </div>
        </section>

        <section className="contact-form-section" id="contact-form">
          <div className="contact-container contact-form-layout">

            <aside className="contact-illustration">
              <div className="contact-paper-plane">
                <Send size={55} strokeWidth={1.5} />
              </div>

              <span className="contact-flight-path">﹏﹏﹏</span>

              <h2>Send us a message</h2>

              <p>
                Share your thoughts using our simple
                enquiry form.
              </p>

              <div className="contact-envelope">
                <div className="contact-envelope-paper">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="contact-envelope-front"></div>
                <div className="contact-envelope-flap"></div>
                <span className="contact-envelope-stamp">✦</span>
              </div>
            </aside>

            <div className="contact-form-panel">
              <span className="contact-form-label">YOUR ENQUIRY</span>
              <h2>Tell us a little about it.</h2>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-field">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="Optional"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-subject">Subject *</label>

                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="General Question">General Question</option>
                    <option value="Platform Features">Platform Features</option>
                    <option value="Project Feedback">Project Feedback</option>
                    <option value="Demo Enquiry">Demo Enquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-message">Message *</label>

                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="contact-submit">
                  Complete Form Demo <ArrowRight size={18} />
                </button>

                <p className="contact-form-note">
                  <Clock3 size={15} />
                  Frontend preview. Nothing is sent or stored.
                </p>

                {submitted && (
                  <div className="contact-success" role="status">
                    <CheckCircle2 size={20} />
                    Form validation completed successfully.
                    No message was sent.
                  </div>
                )}
              </form>
            </div>

          </div>
        </section>

        <section className="contact-faq">
          <div className="contact-container contact-faq-layout">
            <div>
              <span className="contact-eyebrow">
                <span></span> QUICK ANSWERS
              </span>

              <h2>Frequently asked questions.</h2>
              <p>Everything you need to know about this project.</p>
            </div>

            <div className="contact-faq-items">
              {faqs.map((faq, index) => (
                <div className="contact-faq-item" key={faq.question}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(openFaq === index ? -1 : index)
                    }
                    aria-expanded={openFaq === index}
                  >
                    {faq.question}
                    <ChevronDown
                      size={19}
                      className={openFaq === index ? "rotated" : ""}
                    />
                  </button>

                  {openFaq === index && <p>{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
