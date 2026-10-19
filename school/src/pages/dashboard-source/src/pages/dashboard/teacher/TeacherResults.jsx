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

  const subjects = [
    ...new Set([
      ...SUBJECT_OPTIONS,
      ...s.results.items.map((result) => result.subject).filter(Boolean),
    ]),
  ];

  const sessions = [
    ...new Set([
      ...ACADEMIC_SESSION_OPTIONS,
      ...s.results.items.map((result) => result.session).filter(Boolean),
    ]),
  ];

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
          <Table
            headers={["Student", "Subject", "Exam", "Score"]}
            rows={s.results.items
              .filter(
                (r) =>
                  teacher.id != null &&
                  String(r.teacherId) === String(teacher.id),
              )
              .map((r) => [
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
