import React from "react";

import { Panel, Stats, Table, NoticeList, ReportForm } from "../shared/UI";
import {
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";

export default function StudentFees({ view }) {
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
        <Stats
          items={[
            ["Total fees", "₹" + fees.reduce((n, f) => n + Number(f.total), 0)],
            ["Paid", "₹" + fees.reduce((n, f) => n + Number(f.paid), 0)],
            [
              "Outstanding",
              "₹" +
                fees.reduce(
                  (n, f) => n + Math.max(0, Number(f.total) - Number(f.paid)),
                  0,
                ),
            ],
          ]}
        />
        <Panel title="Fee records">
          <Table
            headers={["Type", "Session", "Total", "Paid", "Due", "Status"]}
            rows={fees.map((x) => [
              x.type,
              x.session,
              `₹${x.total}`,
              `₹${x.paid}`,
              x.due,
              feeStatus(x),
            ])}
          />
        </Panel>
      </>
    </>
  );
}
