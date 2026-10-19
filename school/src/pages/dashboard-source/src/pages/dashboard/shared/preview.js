import { personFromUser } from "./school";

export const previewEnabled =
  import.meta.env.DEV && import.meta.env.VITE_EDUFLOW_PREVIEW !== "false";

export function readDashboardUser() {
  try {
    const user = JSON.parse(localStorage.getItem("eduflowUser") || "null");

    if (user === null || (typeof user === "object" && !Array.isArray(user))) {
      return user;
    }

    throw new TypeError("The saved dashboard user must be an object.");
  } catch (error) {
    console.error("Unable to read the saved dashboard user.", error);

    return null;
  }
}

export function resolveDashboardPerson(records, user, role) {
  const person = personFromUser(records, user, role);

  if (person) {
    return { person };
  }

  if (!previewEnabled) {
    return { person: null };
  }

  const existing = user
    ? null
    : records.find((record) => record && record.id != null);

  if (existing) {
    return { person: existing };
  }

  const title = role[0].toUpperCase() + role.slice(1);
  const fields = {
    teacher: { employee: "", department: "", subject: "", classes: "" },
    student: { admission: "", classId: "", roll: "" },
    parent: { parentNo: "" },
  };

  return {
    person: {
      id: null,
      name: `${title} Preview (temporary)`,
      ...fields[role],
      previewOnly: true,
    },
  };
}
