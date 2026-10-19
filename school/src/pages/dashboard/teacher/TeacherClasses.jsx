import React from "react";

import {
  Empty,
  Panel,
  Stats,
  Table,
  NoticeList,
  ReportForm,
} from "../shared/UI";
import {
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";
import { schoolClassId } from "../shared/school";

export default function TeacherClasses({ view }) {
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
      <Panel title="My assigned classes">
        {assigned.length ? (
          <Table
            headers={["Class", "Students", "Class teacher", "Student names"]}
            rows={assigned.map((c) => [
              schoolClassId(c),
              students.filter((x) => x.classId === schoolClassId(c)).length,
              String(c.teacherId) === String(teacher.id) ? "Yes" : "Assigned",
              students
                .filter((x) => x.classId === schoolClassId(c))
                .map((x) => x.name)
                .join(", ") || "No students yet",
            ])}
          />
        ) : (
          <Empty>No classes have been assigned yet.</Empty>
        )}
      </Panel>
    </>
  );
}
