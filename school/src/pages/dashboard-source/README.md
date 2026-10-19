# Dashboard source snapshot

This folder preserves the uploaded dashboard project as a source reference. It is not a separate application; run EduFlow from the main project root using the existing website and login.

The integrated dashboard pages and contexts are in the main `src/pages/dashboard/` and `src/context/` directories. The nested `src/main.jsx`, `index.html`, and package manifests are not used by the main application.

## Included dashboards

- Admin: student, teacher and parent records, classes, attendance, assignments, fees, reports, and announcements.
- Teacher: classes, attendance, assignments, submissions, results, timetable, reports, announcements, and profile.
- Student: academics, attendance, timetable, assignments, fees, announcements, reports, and profile.
- Parent: children, attendance, academics, assignments, timetable, fees, announcements, reports, and profile.

Dashboard data is stored in browser localStorage. The website's demo login checks dashboard routes by role, but it is not server-backed authentication or authorization.
