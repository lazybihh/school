import React from "react";

import { Empty, Panel, Table } from "../shared/UI";
import DashboardFilters, {
  useDashboardFilters,
} from "../shared/DashboardFilters";
import { SUBMISSION_STATUS_OPTIONS } from "../shared/schoolOptions";

export default function ParentAssignments({ view }) {
  const { s, child, a } = view;
  const assignmentStatus = (assignment) =>
    s.submissions.items.find(
      (submission) =>
        String(submission.assignmentId) === String(assignment.id) &&
        String(submission.studentId) === String(child?.id),
    )?.status || "Pending";
  const assignmentFilters = [
    { key: "subject", label: "Subject", includeDynamic: true },
    {
      key: "status",
      label: "Status",
      options: SUBMISSION_STATUS_OPTIONS,
      value: assignmentStatus,
    },
    { key: "due", label: "Due date", type: "date" },
  ];
  const assignmentState = useDashboardFilters(
    a,
    assignmentFilters,
    ["title", "subject", "due", { value: assignmentStatus }],
  );

  if (!child) {
    return <Empty>No child is linked to this parent yet.</Empty>;
  }

  return (
    <Panel title="Homework monitoring">
      <DashboardFilters
        state={assignmentState}
        filters={assignmentFilters}
        items={a}
      />
      <Table
        headers={["Assignment", "Subject", "Due", "Status", "Feedback"]}
        rows={assignmentState.filteredItems.map((x) => {
          const sub = s.submissions.items.find(
            (y) =>
              String(y.assignmentId) === String(x.id) &&
              String(y.studentId) === String(child.id),
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
