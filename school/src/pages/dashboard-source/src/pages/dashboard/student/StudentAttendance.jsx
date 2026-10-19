import AttendanceCalendar from "../shared/AttendanceCalendar";

import React from "react";

import { Panel, Stats, Table, NoticeList, ReportForm } from "../shared/UI";
import {
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";

export default function StudentAttendance({ view }) {
  const {
    s,
    student,
    teacher,
    a,
    attendance,
    results,
    fees,
    periods,
    submission,
    answers,
    setAnswers,
  } = view;

  return (
    <>
      <>
        <AttendanceCalendar records={attendance} />
        <Stats
          items={[
            [
              "Attendance rate",
              attendanceRate(s.attendance.items, student.id) + "%",
            ],
            [
              "Present",
              attendance.filter((x) => x.status === "Present").length,
            ],
            ["Absent", attendance.filter((x) => x.status === "Absent").length],
            ["Leave", attendance.filter((x) => x.status === "Leave").length],
          ]}
        />
        <Panel title="My attendance history">
          <Table
            headers={["Date", "Status", "Marked by"]}
            rows={[...attendance]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((x) => [x.date, x.status, x.recordedBy])}
          />
        </Panel>
      </>
    </>
  );
}
