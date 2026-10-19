import React from "react";

import { Panel, Stats, Table, NoticeList, ReportForm } from "../shared/UI";
import {
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";

export default function TeacherOverview({ view }) {
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
      <>
        <h1>Welcome back, {teacher.name}!</h1>
        <p className="role-muted">Your teaching workspace · {today()}</p>
        <Stats
          items={[
            ["Assigned classes", ids.length],
            ["My students", students.length],
            ["Active assignments", assignments.length],
            [
              "Submissions to review",
              subs.filter((x) => x.status === "Submitted").length,
            ],
          ]}
        />
        <Panel title="Today's teaching schedule">
          <Table
            headers={["Time", "Class", "Subject"]}
            rows={ownPeriods
              .filter(
                (t) =>
                  t.day ===
                  new Date().toLocaleDateString("en-US", { weekday: "long" }),
              )
              .map((t) => [`${t.start}–${t.end}`, t.classId, t.subject])}
          />
        </Panel>
        <Panel title="Recent announcements">
          <NoticeList
            items={relevantNotices(s.notices.items, "Teacher")
              .slice(-4)
              .reverse()}
          />
        </Panel>
      </>
    </>
  );
}
