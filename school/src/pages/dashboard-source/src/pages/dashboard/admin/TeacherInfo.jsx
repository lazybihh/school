import { teacherFilters } from "./moduleFilters";

import React from "react";

import { useTeacher } from "../../../context/TeacherContext";
import { useClass } from "../../../context/ClassContext";

import RecordManager from "./RecordManager";
import { teacherFields } from "./fields";
import { CLASS_OPTIONS } from "../shared/schoolOptions";

export default function TeacherInfo() {
  const { data } = useTeacher();
  const { data: classes } = useClass();

  const classOptions = [
    ...new Set([
      ...CLASS_OPTIONS,
      ...classes.items.map(
        (schoolClass) => `${schoolClass.grade}-${schoolClass.section}`,
      ),
    ]),
  ];

  const fields = teacherFields.map((field) =>
    field.key === "classes" ? { ...field, options: classOptions } : field,
  );

  return (
    <RecordManager
      title="Teacher Information"
      description="Manage teacher profiles, subjects and assignments."
      data={data}
      fields={fields}
      filters={teacherFilters}
      getLabel={(item) => item.name}
    />
  );
}
