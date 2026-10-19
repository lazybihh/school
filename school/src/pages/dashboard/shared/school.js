export const today = () =>
  [
    new Date().getFullYear(),
    String(new Date().getMonth() + 1).padStart(2, "0"),
    String(new Date().getDate()).padStart(2, "0"),
  ].join("-");

export const schoolClassId = (schoolClass) =>
  schoolClass.classId ||
  (schoolClass.grade && schoolClass.section
    ? `${schoolClass.grade}-${schoolClass.section}`
    : schoolClass.id);

export const teacherClasses = (teacher, classes) => {
  if (teacher?.id == null) {
    return [];
  }

  const assignedIds = Array.isArray(teacher.classes)
    ? teacher.classes
    : String(teacher.classes || "")
        .split(",")
        .map((classId) => classId.trim())
        .filter(Boolean);

  return classes.filter(
    (schoolClass) =>
      String(schoolClass.teacherId) === String(teacher.id) ||
      assignedIds.includes(schoolClassId(schoolClass)) ||
      assignedIds.includes(schoolClass.id),
  );
};

export const feeStatus = (f) =>
  Number(f.paid) >= Number(f.total)
    ? "Paid"
    : f.due && f.due < today()
      ? "Overdue"
      : Number(f.paid) > 0
        ? "Partial"
        : "Pending";

export const attendanceRate = (records, id, role = "student") => {
  const rows = records.filter(
    (a) => a.role === role && String(a.personId) === String(id),
  );

  return rows.length
    ? Math.round(
        (rows.filter((a) => a.status === "Present").length / rows.length) * 100,
      )
    : 0;
};

export const personFromUser = (records, user, role) => {
  if (!user) {
    return null;
  }

  if (
    typeof user.role !== "string" ||
    user.role.toLowerCase() !== role.toLowerCase()
  ) {
    return null;
  }

  const recordId = user.recordId || user[role + "Id"];

  if (recordId != null) {
    const personById = records.find(
      (person) =>
        person?.id != null && String(person.id) === String(recordId),
    );

    if (personById) {
      return personById;
    }
  }

  if (!user.email) {
    return null;
  }

  return records.find(
    (person) =>
      person?.email &&
      String(person.email).toLowerCase() === String(user.email).toLowerCase(),
  );
};

export const relevantNotices = (notices, role) =>
  notices.filter(
    (n) =>
      ["Everyone", "All", role].includes(n.audience) ||
      n.audience === role + "s",
  );

export const labelDate = (d) => d || "Not specified";
