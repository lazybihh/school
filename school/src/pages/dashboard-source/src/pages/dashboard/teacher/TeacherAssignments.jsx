import React from "react";

import { Panel, Stats, Table, NoticeList, ReportForm } from "../shared/UI";
import {
  schoolClassId,
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";
import { SUBJECT_OPTIONS } from "../shared/schoolOptions";

export default function TeacherAssignments({ view }) {
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
      ...assignments.map((assignment) => assignment.subject).filter(Boolean),
    ]),
  ];

  return (
    <>
      <>
        <Panel title="Create homework">
          <form
            className="role-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!ids.length) return;
              s.assignments.add({
                ...form,
                classId: classId || ids[0],
                teacherId: teacher.id,
                created: today(),
              });
              setForm({ title: "", subject: "", description: "", due: "" });
            }}
          >
            <label>
              Title
              <input
                required
                value={form.title}
                onChange={(e) => setField(setForm, "title", e.target.value)}
              />
            </label>
            <label>
              Subject
              <select
                required
                value={form.subject}
                onChange={(e) => setField(setForm, "subject", e.target.value)}
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
              Class
              <select
                value={classId || ids[0] || ""}
                onChange={(e) => setClassId(e.target.value)}
              >
                {assigned.map((schoolClass) => (
                  <option
                    key={schoolClass.id}
                    value={schoolClassId(schoolClass)}
                  >
                    {schoolClassId(schoolClass)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Due date
              <input
                required
                type="date"
                value={form.due}
                onChange={(e) => setField(setForm, "due", e.target.value)}
              />
            </label>
            <label className="wide">
              Instructions
              <textarea
                value={form.description}
                onChange={(e) =>
                  setField(setForm, "description", e.target.value)
                }
              />
            </label>
            <button className="role-primary" disabled={!ids.length}>
              Create assignment
            </button>
          </form>
        </Panel>
        <Panel title="My assignments">
          <Table
            headers={["Title", "Class", "Subject", "Due", "Manage"]}
            rows={assignments.map((a) => [
              a.title,
              a.classId,
              a.subject,
              a.due,
              <button
                className="role-secondary"
                onClick={() => {
                  if (confirm("Delete assignment?")) s.assignments.remove(a.id);
                }}
              >
                Delete
              </button>,
            ])}
          />
        </Panel>
      </>
    </>
  );
}
