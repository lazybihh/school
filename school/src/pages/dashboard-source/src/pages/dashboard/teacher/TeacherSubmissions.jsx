import React from "react";

import { Panel, Stats, Table, NoticeList, ReportForm } from "../shared/UI";
import {
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";

export default function TeacherSubmissions({ view }) {
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

  return (
    <>
      <Panel title="Review student submissions">
        <Table
          headers={[
            "Student",
            "Assignment",
            "Submitted",
            "Status",
            "Feedback / Marks",
          ]}
          rows={subs.map((sub) => [
            name(sub.studentId),
            assignments.find((a) => a.id === sub.assignmentId)?.title,
            sub.date,
            sub.status,
            <div className="role-actions">
              <input
                className="role-filter"
                style={{ maxWidth: 150 }}
                aria-label="Feedback"
                placeholder="Feedback"
                defaultValue={sub.feedback || ""}
                onBlur={(e) =>
                  s.submissions.update(sub.id, { feedback: e.target.value })
                }
              />
              <input
                className="role-filter"
                style={{ maxWidth: 85 }}
                aria-label="Marks"
                type="number"
                min="0"
                placeholder="Marks"
                defaultValue={sub.marks || ""}
                onBlur={(e) =>
                  s.submissions.update(sub.id, { marks: e.target.value })
                }
              />
              <button
                className="role-secondary"
                onClick={() =>
                  s.submissions.update(sub.id, { status: "Checked" })
                }
              >
                Checked
              </button>
              <button
                className="role-secondary"
                onClick={() =>
                  s.submissions.update(sub.id, { status: "Resubmit" })
                }
              >
                Resubmit
              </button>
            </div>,
          ])}
        />
      </Panel>
    </>
  );
}
