import TeacherProfile from "./TeacherProfile";
import TeacherAnnouncements from "./TeacherAnnouncements";
import TeacherReports from "./TeacherReports";
import TeacherTimetable from "./TeacherTimetable";
import TeacherResults from "./TeacherResults";
import TeacherSubmissions from "./TeacherSubmissions";
import TeacherAssignments from "./TeacherAssignments";
import TeacherAttendance from "./TeacherAttendance";
import TeacherClasses from "./TeacherClasses";
import TeacherOverview from "./TeacherOverview";

import React, { useState } from "react";

import useSchool from "../shared/useSchool";
import { readDashboardUser, resolveDashboardPerson } from "../shared/preview";
import {
  Layout,
  Panel,
  Stats,
  Table,
  Empty,
  NoticeList,
  ReportForm,
} from "../shared/UI";
import {
  schoolClassId,
  teacherClasses,
  today,
  relevantNotices,
} from "../shared/school";
import {
  ACADEMIC_SESSION_OPTIONS,
  DAY_OPTIONS,
  SUBJECT_OPTIONS,
} from "../shared/schoolOptions";
import "../shared/Role.css";

const menu = [
  "Overview",
  "My Classes",
  "Attendance",
  "Assignments",
  "Submissions",
  "Marks & Results",
  "Timetable",
  "Reports",
  "Announcements",
  "Profile",
];

export default function TeacherDashboard() {
  const s = useSchool();

  const user = readDashboardUser();
  const { person: teacher } = resolveDashboardPerson(
    s.teachers.items,
    user,
    "teacher",
  );
  const [page, setPage] = useState("Overview"),
    [classId, setClassId] = useState(""),
    [date, setDate] = useState(today()),
    [form, setForm] = useState({
      title: "",
      subject: "",
      description: "",
      due: "",
    }),
    [marks, setMarks] = useState({
      studentId: "",
      subject: "",
      exam: "",
      marks: "",
      total: "",
      session: ACADEMIC_SESSION_OPTIONS[0],
      remarks: "",
    }),
    [period, setPeriod] = useState({
      classId: "",
      day: DAY_OPTIONS[0],
      start: "",
      end: "",
      subject: "",
    });

  const assigned = teacherClasses(teacher, s.classes.items),
    ids = assigned.map(schoolClassId),
    students = s.students.items.filter((x) => ids.includes(x.classId)),
    assignments = s.assignments.items.filter(
      (a) => teacher?.id != null && String(a.teacherId) === String(teacher.id),
    ),
    subs = s.submissions.items.filter((x) =>
      assignments.some((a) => String(a.id) === String(x.assignmentId)),
    ),
    classStudents = students.filter(
      (x) => String(x.classId) === String(classId || ids[0]),
    );
  const setField = (setter, key, value) =>
    setter((old) => ({ ...old, [key]: value }));

  const name = (id) =>
    s.students.items.find((x) => x.id === id)?.name || "Unknown student";

  const ownPeriods = s.timetable.items.filter(
    (t) => teacher?.id != null && String(t.teacherId) === String(teacher.id),
  );
  const view = {
    s,
    teacher,
    assigned,
    ids,
    students,
    assignments,
    subs,
    classStudents,
    classId,
    setClassId,
    date,
    setDate,
    form,
    setForm,
    marks,
    setMarks,
    period,
    setPeriod,
    setField,
    name,
    ownPeriods,
  };

  return (
    <Layout
      role="Teacher"
      name={teacher?.name}
      menu={menu}
      page={page}
      setPage={setPage}
      storageErrors={s.storageErrors}
      accessMessage={
        !teacher &&
        "Sign in through your website to access the Teacher dashboard."
      }
    >
      {teacher && (
        <>
          {page === "Overview" && <TeacherOverview view={view} />}
          {page === "My Classes" && <TeacherClasses view={view} />}
          {page === "Attendance" && <TeacherAttendance view={view} />}
          {page === "Assignments" && <TeacherAssignments view={view} />}
          {page === "Submissions" && <TeacherSubmissions view={view} />}
          {page === "Marks & Results" && <TeacherResults view={view} />}
          {page === "Timetable" && <TeacherTimetable view={view} />}
          {page === "Reports" && <TeacherReports view={view} />}
          {page === "Announcements" && <TeacherAnnouncements view={view} />}
          {page === "Profile" && <TeacherProfile view={view} />}
        </>
      )}
    </Layout>
  );
}
