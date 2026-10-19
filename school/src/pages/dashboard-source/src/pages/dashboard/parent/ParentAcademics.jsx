import React from "react";

import { Empty, Panel, Table } from "../shared/UI";

export default function ParentAcademics({ view }) {
  const { child, results } = view;

  if (!child) {
    return <Empty>No child is linked to this parent yet.</Empty>;
  }

  return (
    <Panel title={`${child.name}'s results`}>
      <Table
        headers={["Exam", "Subject", "Score", "Percentage", "Remarks"]}
        rows={results.map((x) => [
          x.exam,
          x.subject,
          `${x.marks}/${x.total}`,
          Number(x.total) ? Math.round((x.marks / x.total) * 100) + "%" : "—",
          x.remarks,
        ])}
      />
    </Panel>
  );
}
