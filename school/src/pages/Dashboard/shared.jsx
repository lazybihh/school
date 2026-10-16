export function Card({ title, subtitle, children, action }) {
  return (
    <div className="dashboard-card">
      <div className="teacher-section-heading">
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export function Line({ label, value }) {
  return (
    <div className="teacher-class-detail">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function Empty({ message }) {
  return <p className="dashboard-muted">{message}</p>;
}
