# EduFlow

EduFlow is a React + Vite school website with student, teacher, parent, and admin dashboards.

## Run

1. Install Node.js.
2. Run `npm install` in this folder.
3. Run `npm run dev`.

Use the existing Login page to sign in with a demo account listed in `src/data/demoUsers.js`. Dashboard routes check the signed-in role and redirect users who request another role's dashboard to their own. Admin can add school records and create separate demo login accounts in the Login Accounts section; each account is linked to a selected record ID.

Dashboard data and additional demo credentials are stored in this browser's localStorage. The built-in student, teacher and parent demo records are added only when a matching record ID or email is missing; existing records are preserved. This is a frontend demo, not server-backed authentication or authorization. Do not use it with real school data. The contact form does not send information to a server.

The dashboard source snapshot remains in `src/pages/dashboard-source/`; the integrated application runs from the main `src/` tree.
