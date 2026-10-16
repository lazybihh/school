
import { useState } from "react";
import { Pencil, Plus, Trash2, UserRound, Users } from "lucide-react";

import { Card, Empty } from "./shared";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  classId: "",
  childId: ""
};

const labels = {
  students: "Student",
  teachers: "Teacher",
  parents: "Parent"
};

export default function DashboardPeoplePage({ type, user, school, classes }) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const role = type.slice(0, -1);
  const title = labels[type];

  const people = school.users.filter(person => person.role === role);
  const students = school.getStudents();

  function updateForm(event) {
    const { name, value } = event.target;

    setForm(previous => ({
      ...previous,
      [name]: value
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function submitPerson(event) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!editingId && !form.password.trim()) {
      setError("Set a password for this account.");
      return;
    }

    const changes = {
      name: form.name,
      email: form.email,
      classId: form.classId || null,
      childId: form.childId || null
    };

    if (form.password.trim()) {
      changes.password = form.password;
    }

    const result = editingId
      ? school.updateManagedUser(editingId, changes)
      : school.addManagedUser({ ...changes, role });

    if (!result.success) {
      setError(result.message);
      return;
    }

    const message = editingId
      ? `${title} account updated.`
      : `${title} account added.`;

    setNotice(message);
    resetForm();
  }

  function startEdit(person) {
    setForm({
      name: person.name || "",
      email: person.email || "",
      password: "",
      classId: person.classId || "",
      childId: person.childId ? String(person.childId) : ""
    });

    setEditingId(person.id);
    setError("");
    setNotice("");
  }

  function removePerson(person) {
    if (person.id === user.id) {
      setError("You cannot delete the account currently in use.");
      return;
    }

    const confirmed = window.confirm(
      `Delete ${person.name}'s ${role} account?`
    );

    if (!confirmed) return;

    const result = school.deleteManagedUser(person.id);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (editingId === person.id) {
      resetForm();
    }

    setNotice(`${title} account deleted.`);
    setError("");
  }

  function className(classId) {
    const foundClass = classes.find(item => item.id === classId);
    return foundClass?.name || "No class";
  }

  function linkedStudentName(childId) {
    const foundStudent = students.find(
      student => student.id === Number(childId)
    );

    return foundStudent?.name || "No student linked";
  }

  return (
    <>
      <Card
        title={
          editingId
            ? `Update ${title.toLowerCase()} account`
            : `Add ${title.toLowerCase()}`
        }
        subtitle={
          editingId
            ? "Update account details and school assignment"
            : "Create an account with dashboard access"
        }
      >
        <form className="dashboard-form" onSubmit={submitPerson}>
          <label htmlFor={`${type}-name`}>Full name</label>

          <input
            id={`${type}-name`}
            name="name"
            required
            maxLength="80"
            placeholder={`${title} name`}
            value={form.name}
            onChange={updateForm}
          />

          <label htmlFor={`${type}-email`}>Email</label>

          <input
            id={`${type}-email`}
            name="email"
            required
            type="email"
            placeholder="name@school.edu"
            value={form.email}
            onChange={updateForm}
          />

          <label htmlFor={`${type}-password`}>
            Password {editingId && "(leave blank to keep current password)"}
          </label>

          <input
            id={`${type}-password`}
            name="password"
            required={!editingId}
            type="password"
            minLength="6"
            autoComplete="new-password"
            placeholder={
              editingId
                ? "Leave blank to keep current password"
                : "At least 6 characters"
            }
            value={form.password}
            onChange={updateForm}
          />

          {role !== "parent" && (
            <>
              <label htmlFor={`${type}-class`}>Class</label>

              <select
                id={`${type}-class`}
                name="classId"
                value={form.classId}
                onChange={updateForm}
              >
                <option value="">No class assigned</option>

                {classes.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {role === "parent" && (
            <>
              <label htmlFor={`${type}-student`}>Linked student</label>

              <select
                id={`${type}-student`}
                name="childId"
                value={form.childId}
                onChange={updateForm}
              >
                <option value="">No student linked</option>

                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} · {className(student.classId)}
                  </option>
                ))}
              </select>
            </>
          )}

          {error && (
            <p className="class-form-error" role="alert">
              {error}
            </p>
          )}

          {notice && (
            <p className="people-form-notice" role="status">
              {notice}
            </p>
          )}

          <div className="class-form-actions">
            <button className="dashboard-button" type="submit">
              <Plus size={16} />
              {editingId ? "Save changes" : `Add ${title.toLowerCase()}`}
            </button>

            {editingId && (
              <button
                className="class-cancel-button"
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </Card>

      <Card
        title={`${title}s`}
        subtitle={`${people.length} ${
          people.length === 1 ? "account" : "accounts"
        }`}
      >
        {people.length === 0 ? (
          <Empty
            message={`No ${title.toLowerCase()} accounts have been added yet.`}
          />
        ) : (
          <div className="class-management-list">
            {people.map(person => (
              <article className="class-management-item" key={person.id}>
                <span className="teacher-homework-icon">
                  {role === "parent" ? (
                    <UserRound size={18} />
                  ) : (
                    <Users size={18} />
                  )}
                </span>

                <div className="class-management-info">
                  <h4>{person.name}</h4>
                  <p>{person.email}</p>

                  <span className="class-student-count">
                    {role === "parent"
                      ? `Linked student: ${linkedStudentName(person.childId)}`
                      : `Class: ${className(person.classId)}`}
                  </span>
                </div>

                <div className="class-management-actions">
                  <button
                    className="academic-icon-button"
                    type="button"
                    aria-label={`Edit ${person.name}`}
                    onClick={() => startEdit(person)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="academic-icon-button danger"
                    type="button"
                    aria-label={`Delete ${person.name}`}
                    disabled={person.id === user.id}
                    title={
                      person.id === user.id
                        ? "You cannot delete the account currently in use"
                        : undefined
                    }
                    onClick={() => removePerson(person)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
