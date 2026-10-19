import React from "react";

import { Panel, Stats, Table, NoticeList, ReportForm } from "../shared/UI";
import {
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";

export default function TeacherProfile({ view }) {
  const {
    s,
    teacher,
    assigned,
    ids,
    students,
    assignments,
    subs,
    classStudents,
    classId,
    setClassId,
    date,
    setDate,
    form,
    setForm,
    marks,
    setMarks,
    period,
    setPeriod,
    setField,
    name,
    ownPeriods,
  } = view;

  return (
    <>
      <Panel title="My profile">
        <Table
          headers={["Field", "Details"]}
          rows={[
            ["Name", teacher.name],
            ["Teacher ID", teacher.employee],
            ["Email", teacher.email],
            ["Department", teacher.department],
            ["Subject", teacher.subject],
            ["Assigned classes", ids.join(", ")],
            ["Status", teacher.status],
          ]}
        />
      </Panel>
    </>
  );
}
