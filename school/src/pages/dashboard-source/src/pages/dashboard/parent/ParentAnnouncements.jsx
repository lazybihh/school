import React from "react";

import { Panel, Stats, Table, NoticeList, ReportForm } from "../shared/UI";
import {
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";

export default function ParentAnnouncements({ view }) {
  const { s, parent, children, child, attendance, results, a, fees, periods } =
    view;

  return (
    <>
      <Panel title="School announcements">
        <NoticeList items={relevantNotices(s.notices.items, "Parent")} />
      </Panel>
    </>
  );
}
