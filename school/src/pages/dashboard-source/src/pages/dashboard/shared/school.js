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

  if (user.role && String(user.role).toLowerCase() !== role.toLowerCase()) {
    return null;
  }

  const recordId = user.recordId || user[role + "Id"] || user.id;
  const recordNumber =
    role === "student"
      ? "admission"
      : role === "teacher"
        ? "employee"
        : "parentNo";

  return records.find((person) => {
    if (!person || person.id == null) {
      return false;
    }

    const matchesId =
      recordId != null && String(person.id) === String(recordId);
    const matchesEmail =
      Boolean(user.email) &&
      String(person.email || "").toLowerCase() ===
        String(user.email).toLowerCase();
    const matchesNumber =
      user.recordId != null &&
      String(person[recordNumber] || "") === String(user.recordId);

    return matchesId || matchesEmail || matchesNumber;
  });
};

export const relevantNotices = (notices, role) =>
  notices.filter(
    (n) =>
      ["Everyone", "All", role].includes(n.audience) ||
      n.audience === role + "s",
  );

export const labelDate = (d) => d || "Not specified";
