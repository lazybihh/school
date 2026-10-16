export { demoUsers } from "../data/demoUsers";

export const demoAssignments = [
  {
    id: 1,
    title: "Chapter 5 Exercises",
    subject: "Mathematics",
    classId: "10-A",
    teacherId: 3,
    description: "Complete questions 1 to 10 from Chapter 5.",
    dueDate: "2026-10-20",
    createdAt: "2026-10-14"
  },
  {
    id: 2,
    title: "Science Project",
    subject: "Science",
    classId: "10-A",
    teacherId: 3,
    description: "Prepare a short project on renewable energy.",
    dueDate: "2026-10-25",
    createdAt: "2026-10-14"
  }
];

export const demoAttendance = [
  {
    id: 1,
    studentId: 1,
    classId: "10-A",
    date: "2026-10-14",
    status: "present",
    markedBy: 3
  }
];

export const demoResults = [
  {
    id: 1,
    studentId: 1,
    subject: "Mathematics",
    marks: 88,
    total: 100,
    exam: "Term 1"
  },
  {
    id: 2,
    studentId: 1,
    subject: "Science",
    marks: 91,
    total: 100,
    exam: "Term 1"
  },
  {
    id: 3,
    studentId: 1,
    subject: "English",
    marks: 85,
    total: 100,
    exam: "Term 1"
  },
  {
    id: 4,
    studentId: 1,
    subject: "Social Science",
    marks: 89,
    total: 100,
    exam: "Term 1"
  }
];

export const demoTimetable = [
  {
    id: 1,
    classId: "10-A",
    day: "Monday",
    time: "08:00 - 08:45",
    subject: "Mathematics",
    teacherId: 3
  },
  {
    id: 2,
    classId: "10-A",
    day: "Monday",
    time: "08:45 - 09:30",
    subject: "English",
    teacherId: 3
  },
  {
    id: 3,
    classId: "10-A",
    day: "Monday",
    time: "09:30 - 10:15",
    subject: "Science",
    teacherId: 3
  },
  {
    id: 4,
    classId: "10-A",
    day: "Monday",
    time: "10:15 - 11:00",
    subject: "Social Science",
    teacherId: 3
  },
  {
    id: 5,
    classId: "10-A",
    day: "Monday",
    time: "11:00 - 11:30",
    subject: "Break",
    teacherId: null
  },
  {
    id: 6,
    classId: "10-A",
    day: "Monday",
    time: "11:30 - 12:15",
    subject: "Computer Science",
    teacherId: 3
  }
];

export const demoNotices = [
  {
    id: 1,
    title: "Welcome to EduFlow",
    description: "Welcome to the new school management portal.",
    audience: "all",
    date: "2026-10-14",
    createdBy: 4
  }
];

export const demoFees = [
  {
    id: 1,
    studentId: 1,
    title: "Term 1 School Fee",
    amount: 5000,
    paidAmount: 5000,
    dueDate: "2026-10-30",
    status: "paid"
  }
];

export const demoClasses = [
  {
    id: "10-A",
    name: "10-A",
    teacherId: 3
  }
];
