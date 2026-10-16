
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useSchool } from "../../context/SchoolContext";

import { createAcademicPages } from "./academics";
import { createAdminPages } from "./administration";
import { createOverviewPage } from "./overview";

import DashboardClassesPage from "./classes";
import DashboardPeoplePage from "./people";
import { Card, Empty } from "./shared";

import "../../components/dashboard/DashboardTheme.css";

const today = () => new Date().toLocaleDateString("en-CA");

const initialHomework = {
  title: "",
  subject: "",
  classId: "10-A",
  description: "",
  dueDate: ""
};

const initialResult = {
  studentId: "1",
  subject: "",
  marks: "",
  total: "100",
  exam: "Term 1"
};

const initialPeriod = {
  classId: "10-A",
  day: "Monday",
  time: "",
  subject: ""
};

const initialNotice = {
  title: "",
  description: "",
  audience: "all"
};

const initialFee = {
  studentId: "1",
  title: "",
  amount: "",
  paidAmount: "0",
  dueDate: ""
};

const pageTitles = {
  attendance: "Attendance",
  assignments: "Homework",
  homework: "Homework",
  results: "Exam Results",
  timetable: "Timetable",
  notices: "Announcements",
  announcements: "Announcements",
  fees: "Fees",
  students: "Students",
  teachers: "Teachers",
  parents: "Parents",
  classes: "Classes",
  settings: "Settings",
  profile: "Profile"
};

export default function ConnectedDashboard({ role }) {
  const location = useLocation();
  const school = useSchool();

  const savedUser = JSON.parse(localStorage.getItem("eduflowUser") || "null");
  const user = school.getUserById(savedUser?.id);

  const page = location.pathname.split("/").filter(Boolean).pop();
  const classId = user?.classId || "10-A";
  const defaultTimetableClassId = role === "teacher"
    ? school.classes.find(item => item.teacherId === user?.id)?.id ||
      user?.classId ||
      initialPeriod.classId
    : school.classes[0]?.id || initialPeriod.classId;

  const [homework, setHomework] = useState(initialHomework);
  const [resultForm, setResultForm] = useState(initialResult);
  const [periodForm, setPeriodForm] = useState(() => ({
    ...initialPeriod,
    classId: defaultTimetableClassId
  }));
  const [noticeForm, setNoticeForm] = useState(initialNotice);
  const [feeForm, setFeeForm] = useState(initialFee);
  const [attendanceDate, setAttendanceDate] = useState(today());

  const students = school.getStudents();
  const teachers = school.getTeachers();

  const child = students.find(item => item.id === user?.childId);

  let student = null;

  if (role === "student") {
    student = user;
  } else if (role === "parent") {
    student = child;
  }

  // Get the data each role is allowed to see

  let visibleHomework;
  let visibleAttendance;
  let visibleResults;

  if (role === "admin") {
    visibleHomework = school.assignments;
    visibleAttendance = school.attendance;
    visibleResults = school.results;
  } else if (role === "teacher") {
    visibleHomework = school.getTeacherAssignments(user?.id);
    visibleAttendance = school.getClassAttendance(classId);

    visibleResults = school.results.filter(result =>
      students.some(
        item =>
          item.id === result.studentId &&
          item.classId === classId
      )
    );
  } else {
    visibleHomework = school.getClassAssignments(student?.classId);
    visibleAttendance = school.getStudentAttendance(student?.id);
    visibleResults = school.getStudentResults(student?.id);
  }

  const teacherClassIds = school.classes
    .filter(item => item.teacherId === user?.id)
    .map(item => item.id);

  if (role === "teacher" && user?.classId && !teacherClassIds.includes(user.classId)) {
    teacherClassIds.push(user.classId);
  }

  if (role === "teacher" && teacherClassIds.length === 0) {
    teacherClassIds.push(classId);
  }

  const visibleTimetable = role === "admin"
    ? school.timetable
    : role === "teacher"
      ? school.timetable.filter(period => teacherClassIds.includes(period.classId))
      : school.getClassTimetable(student?.classId || classId);

  const visibleNotices = school.getNoticesForRole(role);

  const visibleFees = role === "admin"
    ? school.fees
    : school.getStudentFees(student?.id);

  // Check account access

  if (!user || user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  if (role === "parent" && !child) {
    return (
      <DashboardLayout role={role} user={user} title="Dashboard">
        <Card title="No linked student">
          <Empty message="This parent account has no linked student." />
        </Card>
      </DashboardLayout>
    );
  }

  // Form functions

  function studentName(id) {
    const foundStudent = students.find(item => item.id === Number(id));
    return foundStudent?.name || "Student";
  }

  function addHomework(event) {
    event.preventDefault();

    school.addAssignment({
      ...homework,
      teacherId: user.id
    });

    setHomework(initialHomework);
  }

  function saveResult(event) {
    event.preventDefault();

    const marks = Number(resultForm.marks);
    const total = Number(resultForm.total);

    if (total <= 0 || marks < 0 || marks > total) {
      alert("Please enter valid marks.");
      return;
    }

    school.addResult({
      ...resultForm,
      studentId: Number(resultForm.studentId),
      marks,
      total
    });

    setResultForm(initialResult);
  }

  function saveNotice(event) {
    event.preventDefault();

    school.addNotice({
      ...noticeForm,
      createdBy: user.id
    });

    setNoticeForm(initialNotice);
  }

  function savePeriod(event) {
    event.preventDefault();

    const { id, ...period } = periodForm;
    const [startTime, endTime] = period.time.split(" - ");

    if (!startTime || !endTime || startTime >= endTime) {
      alert("Please enter a valid period end time after its start time.");
      return;
    }

    if (
      role === "teacher" &&
      !teacherClassIds.includes(period.classId)
    ) {
      alert("You can only update the timetable for your assigned classes.");
      return;
    }

    if (
      role === "teacher" &&
      id &&
      !visibleTimetable.some(item => item.id === id)
    ) {
      alert("You can only update timetable periods for your assigned classes.");
      return;
    }

    const periodData = {
      ...period,
      teacherId: role === "teacher" ? user.id : null
    };

    if (id) {
      school.updateTimetablePeriod(id, periodData);
    } else {
      school.addTimetablePeriod(periodData);
    }

    setPeriodForm({
      ...initialPeriod,
      classId: defaultTimetableClassId
    });
  }

  function saveFee(event) {
    event.preventDefault();

    const amount = Number(feeForm.amount);
    const paidAmount = Number(feeForm.paidAmount);

    if (amount <= 0 || paidAmount < 0 || paidAmount > amount) {
      alert("Please enter a valid fee amount.");
      return;
    }

    school.addFee({
      ...feeForm,
      studentId: Number(feeForm.studentId),
      amount,
      paidAmount,
      status: paidAmount >= amount ? "paid" : "pending"
    });

    setFeeForm(initialFee);
  }

  // Data shared with the other dashboard files

  const pageContext = {
    role,
    user,
    school,
    classId,
    today,

    students,
    teachers,
    student,
    child,
    studentName,

    homework,
    setHomework,
    addHomework,
    visibleHomework,

    attendanceDate,
    setAttendanceDate,
    visibleAttendance,
    markClassAttendance: school.markClassAttendance,

    resultForm,
    setResultForm,
    saveResult,
    visibleResults,

    periodForm,
    setPeriodForm,
    savePeriod,
    visibleTimetable,
    teacherClassIds,

    noticeForm,
    setNoticeForm,
    saveNotice,
    visibleNotices,

    feeForm,
    setFeeForm,
    saveFee,
    visibleFees
  };

  const {
    homeworkPage,
    attendancePage,
    resultsPage,
    timetablePage
  } = createAcademicPages(pageContext);

  const {
    noticesPage,
    feesPage,
    profilePage
  } = createAdminPages(pageContext);

  const { overviewPage } = createOverviewPage({
    ...pageContext,
    homeworkPage,
    noticesPage
  });

  // Decide which page to display

  function renderPage() {
    switch (page) {
      case "attendance":
        return attendancePage();

      case "assignments":
      case "homework":
        return homeworkPage();

      case "results":
        return resultsPage();

      case "timetable":
        return timetablePage();

      case "notices":
      case "announcements":
        return noticesPage();

      case "fees":
        if (role === "teacher") {
          return (
            <Card title="Fees">
              <Empty message="Managed by Admin." />
            </Card>
          );
        }

        return feesPage();

      case "students":
      case "parents":
        if (role !== "admin" && role !== "teacher") {
          return overviewPage();
        }

        return (
          <DashboardPeoplePage
            type={page}
            user={user}
            school={school}
            classes={school.classes}
          />
        );

      case "teachers":
        if (role !== "admin") {
          return overviewPage();
        }

        return (
          <DashboardPeoplePage
            type={page}
            user={user}
            school={school}
            classes={school.classes}
          />
        );

      case "classes":
        if (role !== "admin" && role !== "teacher") {
          return overviewPage();
        }

        return (
          <DashboardClassesPage
            role={role}
            user={user}
            school={school}
            teachers={teachers}
          />
        );

      case "settings":
      case "profile":
        return profilePage();

      default:
        return overviewPage();
    }
  }

  return (
    <DashboardLayout
      role={role}
      user={user}
      title={pageTitles[page] || "Dashboard"}
    >
      <div className="teacher-dashboard">
        {renderPage()}
      </div>
    </DashboardLayout>
  );
}
