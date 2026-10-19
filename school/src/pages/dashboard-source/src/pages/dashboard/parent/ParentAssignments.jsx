import React from "react";

import { Empty, Panel, Table } from "../shared/UI";

export default function ParentAssignments({ view }) {
  const { s, child, a } = view;

  if (!child) {
    return <Empty>No child is linked to this parent yet.</Empty>;
  }

  return (
    <Panel title="Homework monitoring">
      <Table
        headers={["Assignment", "Subject", "Due", "Status", "Feedback"]}
        rows={a.map((x) => {
          const sub = s.submissions.items.find(
            (y) => y.assignmentId === x.id && y.studentId === child.id,
          );

          return [
            x.title,
            x.subject,
            x.due,
            sub?.status || "Pending",
            sub?.feedback || "—",
          ];
        })}
      />
    </Panel>
  );
}
