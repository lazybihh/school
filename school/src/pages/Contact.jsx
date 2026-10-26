import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  School,
  Send
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

/*
  SCHOOL DETAILS: fill these in with the school's real information.
  Anything left empty ("") is simply not shown on the page.
*/
const SCHOOL = {
  name: "VEDA International School",
  address: "Thurana (Hansi), Haryana", // add the full street address here
  phone: "",                           // for example "+91 98765 43210"
  email: "",                           // for example "info@school.com"
  hours: ""                            // for example "Mon to Sat, 8:00 AM to 2:00 PM"
};

/*
  MAP: replace this with the agreed Google Maps embed link
  (Google Maps > Share > Embed a map > copy the src="..." address).
  Until then the map searches for the school name and address.
*/
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${SCHOOL.name} ${SCHOOL.address}`
)}&output=embed`;

// Opens the school location in Google Maps (used by "Get Directions").
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${SCHOOL.name} ${SCHOOL.address}`
)}`;

/*
  Where the contact form is sent.
  Paste your form endpoint here (for example a Formspree URL or your own API).
  WHILE THIS IS EMPTY the form only shows the success message and sends nothing.
*/
const ENQUIRY_URL = "";

const subjectOptions = [
  "Admission enquiry",
  "General enquiry",
  "Feedback",
  "Other"
];

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: ""
};

/* Shows a branded placeholder if a photograph is missing. */

function LocalImage({ src, alt, className = "", ...props }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <div className={`ct-image-holder ${className}`}>
      {!failed ? (
        <img src={src} alt={alt} onError={() => setFailed(true)} {...props} />
      ) : (
        <div className="ct-image-placeholder" role="img" aria-label={alt}>
          <School size={28} strokeWidth={1.4} />
          <span>VEDA</span>
        </div>
      )}
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  // The information cards. Cards without a value are left out.
  const infoCards = [
    SCHOOL.address && {
      icon: MapPin,
      label: "VISIT US",
      value: SCHOOL.address,
      linkText: "Get Directions",
      href: DIRECTIONS_URL,
      external: true
    },
    SCHOOL.phone && {
      icon: Phone,
      label: "CALL US",
      value: SCHOOL.phone,
      linkText: "Call Now",
      href: `tel:${SCHOOL.phone.replace(/[^\d+]/g, "")}`
    },
    SCHOOL.email && {
      icon: Mail,
      label: "EMAIL US",
      value: SCHOOL.email,
      linkText: "Send an Email",
      href: `mailto:${SCHOOL.email}`
    },
    SCHOOL.hours && {
      icon: Clock,
      label: "SCHOOL HOURS",
      value: SCHOOL.hours
    },
    {
      icon: ClipboardList,
      label: "ADMISSIONS",
      value: "Looking to join VEDA?",
      linkText: "Admission Enquiry",
      to: "/admissions#enquiry"
    }
  ].filter(Boolean);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");

    try {
      if (ENQUIRY_URL) {
        const response = await fetch(ENQUIRY_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form)
        });

        if (!response.ok) throw new Error("The message could not be sent.");
      } else {
        console.warn("Contact form is not connected yet (ENQUIRY_URL is empty). Nothing was sent.");
      }

      setForm(emptyForm);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />

      <main className="veda-contact">

        {/* 1. BANNER: clear photograph, text only as small tags */}

        <section className="ct-banner" aria-label="Contact Us">
          <div className="ct-banner-stage">
            <LocalImage
              src="/images/hero.png"
              alt="VEDA International School campus and students"
              className="ct-banner-photo"
              loading="eager"
            />

            <div className="ct-tag ct-tag-top-left">
              <GraduationCap size={18} />
              <strong>VEDA INTERNATIONAL SCHOOL</strong>
            </div>

            <div className="ct-tag ct-tag-top-right">
              <MapPin size={16} />
              <span>THURANA (HANSI)</span>
            </div>

            <nav className="ct-tag ct-tag-bottom-left" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={14} />
              <span aria-current="page">Contact Us</span>
            </nav>

            <div className="ct-tag ct-tag-center">
              <small>CONTACT US</small>
              <strong>We'd Love to Hear from You</strong>
            </div>
          </div>
        </section>

        {/* 2. CONTACT DETAILS */}

        <section className="ct-info">
          <div className="ct-container">

            <div className="ct-heading">
              <div className="ct-eyebrow">
                <span />
                GET IN TOUCH
              </div>

              <h2>
                How Can We <em>Help You?</em>
              </h2>

              <p className="ct-lead">
                Visit the school, reach us by phone or email, or send a
                message using the form below.
              </p>
            </div>

            <div className="ct-info-grid">
              {infoCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article className="ct-info-card" key={card.label}>
                    <span className="ct-icon-circle">
                      <Icon size={22} strokeWidth={1.7} />
                    </span>

                    <span className="ct-info-label">{card.label}</span>
                    <p>{card.value}</p>

                    {card.to && (
                      <Link to={card.to} className="ct-text-link">
                        {card.linkText} <ArrowUpRight size={16} />
                      </Link>
                    )}

                    {card.href && (
                      <a
                        href={card.href}
                        className="ct-text-link"
                        {...(card.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {card.linkText} <ArrowUpRight size={16} />
                      </a>
                    )}
                  </article>
                );
              })}
            </div>

          </div>
        </section>

        {/* 3. FORM AND MAP */}

        <section className="ct-main">
          <div className="ct-container ct-main-layout">

            <div className="ct-form-card">
              {status === "success" ? (
                <div className="ct-success" role="status">
                  <CheckCircle2 size={44} strokeWidth={1.6} />
                  <h3>Thank you for your message</h3>
                  <p>Your message has been submitted to the school.</p>

                  <button
                    type="button"
                    className="ct-btn"
                    onClick={() => setStatus("idle")}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3>Send Us a Message</h3>
                  <p className="ct-form-intro">Fields marked * are required.</p>

                  <div className="ct-fields">

                    <div className="ct-field">
                      <label htmlFor="name">Your Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="ct-field">
                      <label htmlFor="phone">Mobile Number *</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        pattern="[0-9]{10}"
                        title="Enter a 10-digit mobile number"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="ct-field">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </div>

                    <div className="ct-field">
                      <label htmlFor="subject">Subject *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Select subject</option>
                        {subjectOptions.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="ct-field ct-field-wide">
                      <label htmlFor="message">Your Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                  </div>

                  {status === "error" && (
                    <p className="ct-error" role="alert">
                      Sorry, we could not send your message. Please try again
                      or contact the school directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="ct-btn ct-submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                    <Send size={17} />
                  </button>
                </form>
              )}
            </div>

            <div className="ct-map-card">
              <div className="ct-map-frame">
                <iframe
                  title={`Map showing the location of ${SCHOOL.name}`}
                  src={MAP_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="ct-map-footer">
                <div>
                  <strong>{SCHOOL.name}</strong>
                  <span>{SCHOOL.address}</span>
                </div>

                <a
                  href={DIRECTIONS_URL}
                  className="ct-text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Maps <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Contact;