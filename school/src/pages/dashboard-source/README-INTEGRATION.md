# Dashboard source snapshot

This folder is retained as the source snapshot for the dashboard integration. It is not a separate application and should not be run on its own.

The main website imports the dashboard pages and contexts into its own `src/` tree. It keeps the website's existing home page, Login page, routing, and design. The standalone dashboard `main.jsx`, preview page, `index.html`, and package manifests are not used by the main app.

All four `/dashboard/{role}` routes are protected by the existing website login. The `eduflowUser.role` saved by Login must match the route role; requesting another role redirects to the signed-in user's dashboard. Development preview mode is not included in the integrated app. Built-in demo student, teacher, parent and Class 10-A records are added when missing, without replacing saved records. Admin can create separate local demo login accounts linked by school record ID from the Login Accounts section.

Dashboard data and additional demo credentials are stored in browser localStorage. The demo login is not server-backed authentication or authorization; implement backend access controls before using this application with real school data.

## Included modules

Teacher: Overview, Classes, Attendance, Assignments, Submissions, Results, Timetable, Reports, Announcements, Profile. Student: Overview, Academics, Attendance, Timetable, Assignments, Fees, Announcements, Reports, Profile. Parent: Overview, Children, Attendance, Academics, Assignments, Timetable, Fees, Announcements, Reports, Profile.

## Limits

Existing Admin has not been expanded with dedicated Results/Timetable/Submissions monitoring screens. Those shared Contexts are ready for future Admin views. Homework submissions are text-based; no server file upload, payment gateway, real login or backend access controls. Existing data uses browser localStorage (same browser profile), not multi-device synchronization. Check all workflows with representative records.
