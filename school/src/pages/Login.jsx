
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  Landmark,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Users
} from "lucide-react";
import Navbar from "../components/Navbar";
import "./Login.css";

const roles = [
  {
    name: "Student",
    icon: GraduationCap,
    description: "Learn and grow"
  },
  {
    name: "Teacher",
    icon: Users,
    description: "Manage classes"
  },
  {
    name: "Parent",
    icon: ShieldCheck,
    description: "Follow progress"
  },
  {
    name: "Admin",
    icon: Landmark,
    description: "Manage school"
  }
];

export default function Login() {
  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function chooseRole(name) {
    setRole(name);
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    setMessage(
      `${role} login preview completed. Authentication is not connected yet.`
    );
    setPassword("");
  }

  return (
    <>
      <Navbar />

      <main className="login-page">
        <div className="login-shell">
          <section className="login-main">
            <div className="login-art">
              <div className="login-art-photo" />

              <div className="login-art-overlay" />

              <Link to="/" className="login-art-brand">
                <span className="login-art-brand-icon">
                  <GraduationCap size={25} />
                </span>
                edu<span>flow</span><i>.</i>
              </Link>

              <div className="login-art-content">
                <span className="login-eyebrow">
                  YOUR FUTURE STARTS HERE
                </span>

                <h1>
                  Learning today.
                  <br />
                  <span>Leading tomorrow.</span>
                </h1>

                <p>
                  One place for students, teachers, parents,
                  and schools to learn and grow together.
                </p>

                <div className="login-art-note">
                  <span className="login-art-note-icon">
                    <Check size={17} />
                  </span>
                  <span>Better learning, brighter futures.</span>
                </div>
              </div>

              <div className="login-art-decoration decoration-one" />
              <div className="login-art-decoration decoration-two" />
            </div>

            <div className="login-form-side">
              <section className="login-card">
                <div className="login-card-heading">
                  <span className="login-card-kicker">
                    WELCOME TO EDUFLOW
                  </span>
                  <h2>Welcome back!</h2>
                  <p>
                    Sign in to continue your learning journey.
                  </p>
                </div>

                <div className="login-role-heading">
                  <span>Continue as</span>
                  <span className="login-role-hint">
                    Choose your role
                  </span>
                </div>

                <div className="login-role-picker">
                  {roles.map((item) => {
                    const Icon = item.icon;
                    const active = role === item.name;

                    return (
                      <button
                        key={item.name}
                        type="button"
                        className={`login-role-option ${
                          active ? "active" : ""
                        }`}
                        onClick={() => chooseRole(item.name)}
                        aria-pressed={active}
                      >
                        <Icon size={21} strokeWidth={1.9} />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                  <label htmlFor="login-email">
                    Email address
                  </label>

                  <div className="login-input">
                    <Mail size={19} aria-hidden="true" />

                    <input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>

                  <div className="login-password-label">
                    <label htmlFor="login-password">
                      Password
                    </label>
                  </div>

                  <div className="login-input">
                    <LockKeyhole size={19} aria-hidden="true" />

                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />

                    <button
                      type="button"
                      className="login-eye"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>

                  <p className="login-demo-note">
                    Demo mode — authentication is not connected yet.
                  </p>

                  <button type="submit" className="login-submit">
                    <span>Sign In as {role}</span>
                    <ArrowRight size={19} />
                  </button>

                  {message && (
                    <p className="login-message" role="status">
                      <Check size={17} />
                      <span>{message}</span>
                    </p>
                  )}
                </form>

                <div className="login-divider">
                  <span>OR EXPLORE EDUFLOW</span>
                </div>

                <Link to="/features" className="login-explore">
                  <span className="login-explore-icon">
                    <BookOpen size={19} />
                  </span>

                  <span className="login-explore-text">
                    <strong>Discover our features</strong>
                    <small>See what Eduflow can do for you</small>
                  </span>

                  <ArrowRight size={18} className="login-explore-arrow" />
                </Link>

                <p className="login-card-bottom">
                  New to Eduflow?{" "}
                  <Link to="/about">Get to know us</Link>
                </p>
              </section>
            </div>
          </section>

          <footer className="login-footer">
            <div className="login-footer-brand">
              <GraduationCap size={20} />
              <span>Learning made better.</span>
            </div>

            <span className="login-footer-message">
              Built for every step of the learning journey.
            </span>

            <Link to="/contact">Contact us <ArrowRight size={15} /></Link>
          </footer>
        </div>
      </main>
    </>
  );
}
