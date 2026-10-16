
import { useState } from "react";
import { Pencil, Plus, School, Trash2, Users } from "lucide-react";
import { Card, Empty } from "./shared";

const emptyForm = {
  name: "",
  teacherId: ""
};

export default function DashboardClassesPage({ role, user, school, teachers }) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const isAdmin = role === "admin";

  const visibleClasses = isAdmin
    ? school.classes
    : school.classes.filter(
        item => item.teacherId === user.id || item.id === user.classId
      );

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
    setError("");
  }

  function submitClass(event) {
    event.preventDefault();
    setError("");

    const result = editingId
      ? school.updateClass(editingId, form)
      : school.addClass(form);

    if (!result.success) {
      setError(result.message);
      return;
    }

    resetForm();
  }

  function editClass(item) {
    setForm({
      name: item.name,
      teacherId: item.teacherId ? String(item.teacherId) : ""
    });

    setEditingId(item.id);
    setError("");
  }

  function deleteClass(item) {
    const studentCount = school.getClassStudents(item.id).length;

    const detail = studentCount
      ? ` ${studentCount} enrolled student(s) will be unassigned.`
      : "";

    const confirmed = window.confirm(
      `Delete class ${item.name}?${detail} Timetable periods will also be removed.`
    );

    if (!confirmed) return;

    school.deleteClass(item.id);

    if (editingId === item.id) {
      resetForm();
    }
  }

  function teacherName(teacherId) {
    const teacher = teachers.find(
      item => item.id === Number(teacherId)
    );

    return teacher?.name || "No teacher assigned";
  }

  return (
    <>
      {isAdmin && (
        <Card
          title={editingId ? "Update class" : "Add a class"}
          subtitle={
            editingId
              ? "Change the class name or assigned teacher"
              : "Create a class and assign its class teacher"
          }
        >
          <form className="dashboard-form" onSubmit={submitClass}>
            <label htmlFor="class-name">Class name</label>

            <input
              id="class-name"
              name="name"
              required
              maxLength="40"
              placeholder="For example, 9-B"
              value={form.name}
              onChange={updateForm}
            />

            <label htmlFor="class-teacher">Class teacher</label>

            <select
              id="class-teacher"
              name="teacherId"
              value={form.teacherId}
              onChange={updateForm}
            >
              <option value="">No teacher assigned</option>

              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>

            {error && (
              <p className="class-form-error" role="alert">
                {error}
              </p>
            )}

            <div className="class-form-actions">
              <button className="dashboard-button" type="submit">
                <Plus size={16} />
                {editingId ? "Save class" : "Add class"}
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
      )}

      <Card
        title={isAdmin ? "Class management" : "My classes"}
        subtitle={`${visibleClasses.length} ${
          visibleClasses.length === 1 ? "class" : "classes"
        }`}
      >
        {visibleClasses.length === 0 ? (
          <Empty
            message={
              isAdmin
                ? "No classes yet. Use the form above to add one."
                : "No classes are currently assigned to you."
            }
          />
        ) : (
          <div className="class-management-list">
            {visibleClasses.map(item => {
              const studentCount = school.getClassStudents(item.id).length;

              return (
                <article className="class-management-item" key={item.id}>
                  <span className="teacher-homework-icon">
                    <School size={19} />
                  </span>

                  <div className="class-management-info">
                    <h4>{item.name}</h4>
                    <p>Class teacher: {teacherName(item.teacherId)}</p>

                    <span className="class-student-count">
                      <Users size={14} />
                      {studentCount} {studentCount === 1 ? "student" : "students"}
                    </span>
                  </div>

                  {isAdmin && (
                    <div className="class-management-actions">
                      <button
                        className="academic-icon-button"
                        type="button"
                        aria-label={`Edit class ${item.name}`}
                        onClick={() => editClass(item)}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className="academic-icon-button danger"
                        type="button"
                        aria-label={`Delete class ${item.name}`}
                        onClick={() => deleteClass(item)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </Card>
    </>
  );
}
