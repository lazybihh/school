
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  ClipboardList,
  Megaphone,
  UserRound,
  Users,
  School,
  Wallet,
  Settings,
  LogOut,
  House,
  Menu,
  X,
  Bell,
  ChartNoAxesColumn,
  FileText
} from "lucide-react";

import "./DashboardTheme.css";
import "./DashboardLayout.css";

const dashboardMenus = {
  student: [
    { name: "Overview", path: "", icon: LayoutDashboard },
    { name: "Attendance", path: "attendance", icon: CalendarDays },
    { name: "Timetable", path: "timetable", icon: CalendarDays },
    { name: "Assignments", path: "assignments", icon: BookOpen },
    { name: "Results", path: "results", icon: ChartNoAxesColumn },
    { name: "Notices", path: "notices", icon: Megaphone },
    { name: "Profile", path: "profile", icon: UserRound }
  ],

  parent: [
    { name: "Overview", path: "", icon: LayoutDashboard },
    { name: "My Child", path: "child", icon: UserRound },
    { name: "Attendance", path: "attendance", icon: CalendarDays },
    { name: "Performance", path: "performance", icon: ChartNoAxesColumn },
    { name: "Fee Status", path: "fees", icon: Wallet },
    { name: "Assignments", path: "assignments", icon: BookOpen },
    { name: "Notices", path: "notices", icon: Megaphone }
  ],

  teacher: [
    { name: "Overview", path: "", icon: LayoutDashboard },
    { name: "My Classes", path: "classes", icon: School },
    { name: "Students", path: "students", icon: GraduationCap },
    { name: "Parents", path: "parents", icon: UserRound },
    { name: "Attendance", path: "attendance", icon: CalendarDays },
    { name: "Assignments", path: "assignments", icon: BookOpen },
    { name: "Marks", path: "marks", icon: ClipboardList },
    { name: "Timetable", path: "timetable", icon: CalendarDays },
    { name: "Notices", path: "notices", icon: Megaphone }
  ],

  admin: [
    { name: "Overview", path: "", icon: LayoutDashboard },
    { name: "Students", path: "students", icon: GraduationCap },
    { name: "Teachers", path: "teachers", icon: Users },
    { name: "Parents", path: "parents", icon: UserRound },
    { name: "Classes", path: "classes", icon: School },
    { name: "Fee Management", path: "fees", icon: Wallet },
    { name: "Announcements", path: "notices", icon: Megaphone },
    { name: "Reports", path: "reports", icon: FileText },
    { name: "Settings", path: "settings", icon: Settings }
  ]
};

export default function DashboardLayout({
  role = "student",
  user,
  title = "Dashboard",
  children
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menu = dashboardMenus[role] || dashboardMenus.student;
  const basePath = `/dashboard/${role}`;

  const handleLogout = () => {
    localStorage.removeItem("eduflowUser");
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-app">
      <div className="dashboard-shell">

        {menuOpen && (
          <div
            className="dashboard-overlay"
            onClick={() => setMenuOpen(false)}
          />
        )}

        <aside className={`dashboard-sidebar ${menuOpen ? "open" : ""}`}>
          <div className="dashboard-brand">
            <div className="dashboard-brand-icon">
              <GraduationCap size={25} />
            </div>
            <span>EduFlow<span className="brand-dot">.</span></span>

            <button
              className="dashboard-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={21} />
            </button>
          </div>

          <div className="dashboard-menu-label">
            MAIN MENU
          </div>

          <nav className="dashboard-navigation">
            {menu.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path ? `${basePath}/${item.path}` : basePath}
                  end={!item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `dashboard-nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <Icon size={19} strokeWidth={1.9} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="dashboard-sidebar-bottom">
            <Link
              className="dashboard-return"
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              <House size={19} />
              <span>Back to EduFlow</span>
            </Link>
            <button className="dashboard-logout" onClick={handleLogout}>
              <LogOut size={19} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          <header className="dashboard-topbar">
            <div className="dashboard-topbar-left">
              <button
                className="dashboard-menu-toggle"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={23} />
              </button>

              <div>
                <span className="dashboard-topbar-label">
                  EduFlow / {role}
                </span>
                <h1>{title}</h1>
              </div>
            </div>

            <div className="dashboard-topbar-right">
              <button className="dashboard-notification" aria-label="Notifications">
                <Bell size={21} />
              </button>

              <div className="dashboard-user">
                <div className="dashboard-avatar">
                  {user?.name?.charAt(0) || "U"}
                </div>

                <div className="dashboard-user-info">
                  <strong>{user?.name || "Demo User"}</strong>
                  <span>{role}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="dashboard-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
