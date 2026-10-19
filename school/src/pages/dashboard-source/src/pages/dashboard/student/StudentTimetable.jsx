import React from "react";

import { Panel, Stats, Table, NoticeList, ReportForm } from "../shared/UI";
import {
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";

export default function StudentTimetable({ view }) {
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
      <Panel title="Weekly timetable">
        <Table
          headers={["Day", "Time", "Subject", "Teacher"]}
          rows={[...periods]
            .sort(
              (a, b) =>
                [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].indexOf(a.day) -
                  [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].indexOf(b.day) || a.start.localeCompare(b.start),
            )
            .map((x) => [
              x.day,
              `${x.start}–${x.end}`,
              x.subject,
              teacher(x.teacherId),
            ])}
        />
      </Panel>
    </>
  );
}
