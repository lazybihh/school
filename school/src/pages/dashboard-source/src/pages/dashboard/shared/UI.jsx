import React, { useState } from "react";
import { Menu, GraduationCap, LogOut, ArrowLeft, X } from "lucide-react";

import { previewEnabled } from "./preview";

export function Layout({
  role,
  name,
  menu,
  page,
  setPage,
  children,
  accessMessage,
  storageErrors = [],
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="role-layout">
      <div
        className={open ? "role-overlay show" : "role-overlay"}
        onClick={() => setOpen(false)}
      />
      <aside className={open ? "role-side open" : "role-side"}>
        <div className="role-brand">
          <GraduationCap />
          <strong>
            EduFlow<span>.</span>
          </strong>
          <button className="role-close" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <small>{role.toUpperCase()} WORKSPACE</small>
        <nav>
          {menu.map((m) => (
            <button
              key={m}
              className={page === m ? "active" : ""}
              onClick={() => {
                setPage(m);
                setOpen(false);
              }}
            >
              {m}
            </button>
          ))}
        </nav>
        <div className="role-side-bottom">
          <button onClick={() => location.assign("/")}>
            <ArrowLeft size={16} /> Back to Website
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("eduflowUser");
              location.assign("/");
            }}
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      <main className="role-main">
        <header className="role-top">
          <button className="role-menu" onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <div>
            <small>EduFlow / {role}</small>
            <h2>{page}</h2>
          </div>

          <div className="role-user">{name || `${role} workspace`}</div>
          {previewEnabled && (
            <span className="role-preview-badge">Development preview</span>
          )}
        </header>
        <div className="role-content">
          {storageErrors.map((message) => (
            <p className="storage-warning" role="alert" key={message}>
              {message}
            </p>
          ))}
          {children}
          {accessMessage && <p className="role-empty">{accessMessage}</p>}
        </div>
      </main>
    </div>
  );
}

export function Panel({ title, children, subtitle }) {
  return (
    <section className="role-panel">
      <div className="role-panel-head">
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export function Stats({ items }) {
  return (
    <div className="role-stats">
      {items.map(([label, value]) => (
        <div className="role-stat" key={label}>
          <small>{label}</small>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

export function Empty({ children = "No records available yet." }) {
  return <p className="role-empty">{children}</p>;
}

export function Table({ headers, rows }) {
  return (
    <div className="role-table-wrap">
      <table className="role-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((r, i) => (
              <tr key={i}>
                {r.map((v, j) => (
                  <td key={j}>{v ?? "—"}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length}>
                <Empty />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function NoticeList({ items }) {
  return items.length ? (
    items.map((n) => (
      <article className="role-list" key={n.id}>
        <strong>{n.title}</strong>
        <small>
          {n.date} · {n.priority || "Normal"} · {n.audience}
        </small>
        <p>{n.description}</p>
      </article>
    ))
  ) : (
    <Empty />
  );
}

export function ReportForm({ data, role, user }) {
  const [form, setForm] = useState({
    title: "",
    category: "General",
    description: "",
  });

  const own =
    user?.id == null
      ? []
      : data.items.filter(
          (r) =>
            r.submitterId === user.id ||
            (r.author === user.name && r.role === role),
        );

  if (user?.id == null) {
    return (
      <Panel title="Reports">
        <Empty>Submit a report after signing in with a linked account.</Empty>
      </Panel>
    );
  }

  return (
    <>
      <Panel title="Submit a report">
        <form
          className="role-form"
          onSubmit={(e) => {
            e.preventDefault();
            data.add({
              ...form,
              role,
              author: user.name,
              submitterId: user.id,
              date: new Date().toLocaleDateString("en-CA"),
              status: "Pending",
              response: "",
            });
            setForm({ title: "", category: "General", description: "" });
          }}
        >
          <label>
            Title
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </label>
          <label>
            Category
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {[
                "General",
                "Academic",
                "Attendance",
                "Technical",
                "Facilities",
                "Other",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label className="wide">
            Description
            <textarea
              required
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>
          <button className="role-primary">Submit report</button>
        </form>
      </Panel>
      <Panel title="My submitted reports">
        <Table
          headers={["Title", "Date", "Category", "Status", "Admin response"]}
          rows={own.map((r) => [
            r.title,
            r.date,
            r.category,
            r.status,
            r.response || "Awaiting response",
          ])}
        />
      </Panel>
    </>
  );
}

export function RecordSelector({ items, value, onChange, role }) {
  return (
    <label className="role-selector">
      Demo {role} account{" "}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select {role}</option>
        {items.map((x) => (
          <option key={x.id} value={x.id}>
            {x.name} ({x.admission || x.employee || x.parentNo || x.id})
          </option>
        ))}
      </select>
    </label>
  );
}
