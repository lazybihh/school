import React from "react";

import {
  Empty,
  Panel,
  Stats,
  Table,
  NoticeList,
  ReportForm,
} from "../shared/UI";
import {
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";
import {
  ACADEMIC_SESSION_OPTIONS,
  SUBJECT_OPTIONS,
} from "../shared/schoolOptions";
import DashboardFilters, {
  useDashboardFilters,
} from "../shared/DashboardFilters";
import { SECTION_OPTIONS } from "../shared/schoolOptions";

export default function TeacherResults({ view }) {
  const {
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
  } = view;

  const teacherResults = s.results.items.filter(
    (result) =>
      teacher.id != null &&
      String(result.teacherId) === String(teacher.id) &&
      students.some((student) => String(student.id) === String(result.studentId)),
  );
  const subjects = [
    ...new Set([
      ...SUBJECT_OPTIONS,
      ...teacherResults.map((result) => result.subject).filter(Boolean),
    ]),
  ];

  const sessions = [
    ...new Set([
      ...ACADEMIC_SESSION_OPTIONS,
      ...teacherResults.map((result) => result.session).filter(Boolean),
    ]),
  ];
  const resultFilters = [
    {
      key: "classId",
      label: "Class",
      options: [...new Set(students.map((student) => student.classId))],
      value: (result) =>
        students.find(
          (student) => String(student.id) === String(result.studentId),
        )?.classId,
    },
    {
      key: "section",
      label: "Section",
      options: SECTION_OPTIONS,
      value: (result) =>
        String(
          students.find(
            (student) => String(student.id) === String(result.studentId),
          )?.classId || "",
        ).split("-")[1],
    },
    {
      key: "studentId",
      label: "Student",
      includeDynamic: true,
      value: (result) => name(result.studentId),
    },
    {
      key: "subject",
      label: "Subject",
      includeDynamic: true,
    },
    {
      key: "exam",
      label: "Exam",
      includeDynamic: true,
    },
    {
      key: "session",
      label: "Academic year",
      options: sessions,
    },
  ];
  const resultState = useDashboardFilters(
    teacherResults,
    resultFilters,
    [
      "subject",
      "exam",
      "session",
      "remarks",
      {
        value: (result) =>
          students.find(
            (student) => String(student.id) === String(result.studentId),
          )?.classId,
      },
      { value: (result) => name(result.studentId) },
    ],
  );

  return (
    <>
      <>
        <Panel title="Publish examination result">
          {students.length === 0 && (
            <Empty>No students are assigned to your classes yet.</Empty>
          )}
          <form
            className="role-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (teacher.id == null || students.length === 0) return;

              const old = s.results.items.find(
                (r) =>
                  r.studentId === marks.studentId &&
                  r.subject === marks.subject &&
                  r.exam === marks.exam,
              );
              old
                ? s.results.update(old.id, { ...marks, teacherId: teacher.id })
                : s.results.add({ ...marks, teacherId: teacher.id });
              setMarks({ ...marks, marks: "", remarks: "" });
            }}
          >
            <label>
              Student
              <select
                required
                value={marks.studentId}
                onChange={(e) =>
                  setField(setMarks, "studentId", e.target.value)
                }
              >
                <option value="">Select student</option>
                {students.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name} · {x.classId}
                  </option>
                ))}
              </select>
            </label>
            {[
              ["exam", "Examination"],
              ["marks", "Marks obtained"],
              ["total", "Maximum marks"],
              ["remarks", "Remarks"],
            ].map(([key, label]) => (
              <label key={key}>
                {label}
                <input
                  required={key !== "remarks"}
                  type={["marks", "total"].includes(key) ? "number" : "text"}
                  min="0"
                  value={marks[key]}
                  onChange={(e) => setField(setMarks, key, e.target.value)}
                />
              </label>
            ))}
            <label>
              Subject
              <select
                required
                value={marks.subject}
                onChange={(e) => setField(setMarks, "subject", e.target.value)}
              >
                <option value="">Select subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Session
              <select
                value={marks.session}
                onChange={(e) => setField(setMarks, "session", e.target.value)}
              >
                {sessions.map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="role-primary"
              disabled={teacher.id == null || students.length === 0}
            >
              Save result
            </button>
          </form>
        </Panel>
        <Panel title="Published results">
          <DashboardFilters
            state={resultState}
            filters={resultFilters}
            items={teacherResults}
          />
          <Table
            headers={["Student", "Subject", "Exam", "Score"]}
            rows={resultState.filteredItems.map((r) => [
                name(r.studentId),
                r.subject,
                r.exam,
                `${r.marks}/${r.total}`,
              ])}
          />
        </Panel>
      </>
    </>
  );
}
