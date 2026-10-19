import React from "react";

import { Empty, Panel, Table } from "../shared/UI";

export default function ParentTimetable({ view }) {
  const { child, periods } = view;

  if (!child) {
    return <Empty>No child is linked to this parent yet.</Empty>;
  }

  return (
    <Panel title="Child's timetable">
      <Table
        headers={["Day", "Time", "Subject"]}
        rows={periods.map((x) => [x.day, `${x.start}–${x.end}`, x.subject])}
      />
    </Panel>
  );
}
