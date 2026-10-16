import { BookOpen, CalendarDays, GraduationCap, Megaphone, Users } from "lucide-react";
import { Card } from "./shared";

export function createOverviewPage(context) {
  const { role, students, visibleHomework, visibleAttendance, visibleResults, visibleNotices, user, child, homeworkPage, noticesPage } = context;

  function overviewPage() {
    const cards = [
      {
        title: role === "admin" ? "Students" : "Assignments",
        value: role === "admin" ? students.length : visibleHomework.length,
        icon: role === "admin" ? Users : BookOpen
      },
      {
        title: "Attendance Records",
        value: visibleAttendance.length,
        icon: CalendarDays
      },
      {
        title: "Exam Results",
        value: visibleResults.length,
        icon: GraduationCap
      },
      {
        title: "Announcements",
        value: visibleNotices.length,
        icon: Megaphone
      }
    ];

    return (
      <>
        <div className="teacher-welcome">
          <div>
            <span className="teacher-eyebrow">
              {role.toUpperCase()} PORTAL
            </span>
            <h2>Welcome, {user.name.split(" ")[0]}!</h2>
            <p>
              {role === "parent"
                ? `View ${child.name}'s school activities.`
                : "Here's your EduFlow overview."}
            </p>
          </div>
        </div>

        <div className="teacher-stats">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div className="dashboard-card teacher-stat-card" key={card.title}>
                <div className="teacher-stat-icon blue">
                  <Icon size={21} />
                </div>
                <span>{card.title}</span>
                <strong>{card.value}</strong>
                <small>Shared school records</small>
              </div>
            );
          })}
        </div>

        <div className="teacher-main-grid">
          {homeworkPage()}
          <div className="teacher-side-column">
            {noticesPage()}
          </div>
        </div>
      </>
    );
  }

  return { overviewPage };
}
