import React from "react";

import { Panel, Stats, Table, NoticeList, ReportForm } from "../shared/UI";
import {
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";

export default function StudentAnnouncements({ view }) {
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
      <Panel title="Announcements">
        <NoticeList items={relevantNotices(s.notices.items, "Student")} />
      </Panel>
    </>
  );
}
