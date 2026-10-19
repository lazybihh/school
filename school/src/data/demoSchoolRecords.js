export const demoSchoolRecords = {
  students: [
    {
      id: "demo-student-aarav",
      admission: "DEMO-STU-001",
      name: "Aarav Sharma",
      email: "student@eduflow.com",
      classId: "10-A",
      roll: "1",
      parentId: "demo-parent-priya",
      session: "2026-27",
      status: "Active",
    },
  ],
  teachers: [
    {
      id: "demo-teacher-ananya",
      employee: "DEMO-TEA-001",
      name: "Ananya Gupta",
      email: "teacher@eduflow.com",
      department: "Science",
      subject: "Science",
      classes: ["10-A"],
      status: "Active",
    },
  ],
  parents: [
    {
      id: "demo-parent-priya",
      parentNo: "DEMO-PAR-001",
      name: "Priya Sharma",
      email: "parent@eduflow.com",
      phone: "0000000000",
      relationship: "Mother",
      status: "Active",
    },
  ],
  assignments: [
    {
      id: "demo-assignment-science-10a",
      title: "Ecosystems and Biodiversity",
      subject: "Science",
      description: "Describe how changes in an ecosystem affect biodiversity.",
      classId: "10-A",
      teacherId: "demo-teacher-ananya",
      due: "2026-10-26",
    },
  ],
  attendance: [
    {
      id: "demo-attendance-aarav-2026-10-19",
      role: "student",
      personId: "demo-student-aarav",
      date: "2026-10-19",
      status: "Present",
    },
  ],
  results: [
    {
      id: "demo-result-aarav-science",
      studentId: "demo-student-aarav",
      exam: "Science Assessment",
      subject: "Science",
      marks: 86,
      total: 100,
      remarks: "Good work",
      session: "2026-27",
    },
  ],
};
