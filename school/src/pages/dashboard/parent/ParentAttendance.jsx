import AttendanceCalendar from "../shared/AttendanceCalendar";

import React from "react";

import { Empty, Panel, Stats, Table } from "../shared/UI";
import { attendanceRate } from "../shared/school";

export default function ParentAttendance({ view }) {
  const { s, child, attendance } = view;

  if (!child) {
    return <Empty>No child is linked to this parent yet.</Empty>;
  }

  return (
    <>
      <AttendanceCalendar records={attendance} />
      <Stats
        items={[
          ["Attendance", attendanceRate(s.attendance.items, child.id) + "%"],
          ["Present", attendance.filter((x) => x.status === "Present").length],
          ["Absent", attendance.filter((x) => x.status === "Absent").length],
          ["Leave", attendance.filter((x) => x.status === "Leave").length],
        ]}
      />
      <Panel title={`${child.name}'s attendance`}>
        <Table
          headers={["Date", "Status"]}
          rows={[...attendance]
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((x) => [x.date, x.status])}
        />
      </Panel>
    </>
  );
}
