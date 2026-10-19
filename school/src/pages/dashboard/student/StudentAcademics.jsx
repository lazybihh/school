import React from "react";

import { Panel, Stats, Table, NoticeList, ReportForm } from "../shared/UI";
import {
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";

export default function StudentAcademics({ view }) {
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
        <Panel title="My subjects">
          <p>
            {[
              ...new Set([
                ...a.map((x) => x.subject),
                ...results.map((x) => x.subject),
                ...periods.map((x) => x.subject),
              ]),
            ]
              .filter(Boolean)
              .join(" · ") ||
              "Subjects will appear when your teacher publishes them."}
          </p>
        </Panel>
        <Panel title="Examination results">
          <Table
            headers={["Exam", "Subject", "Marks", "Percentage", "Remarks"]}
            rows={results.map((x) => [
              x.exam,
              x.subject,
              `${x.marks}/${x.total}`,
              Number(x.total)
                ? Math.round((x.marks / x.total) * 100) + "%"
                : "—",
              x.remarks,
            ])}
          />
        </Panel>
      </>
    </>
  );
}
