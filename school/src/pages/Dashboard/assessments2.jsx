
import {
  BookOpen,
  CalendarDays,
  Check,
  Plus,
  Trash2,
  X
} from "lucide-react";

import { Card, Empty } from "./shared";

export function createClassroomPages(context) {
  const {
    role,
    user,
    school,
    classId,
    students,
    studentName,
    today,

    homework,
    setHomework,
    addHomework,
    visibleHomework,

    attendanceDate,
    setAttendanceDate,
    visibleAttendance,
    markClassAttendance
  } = context;

  function updateHomework(field, value) {
    setHomework(previous => ({
      ...previous,
      [field]: value
    }));
  }

  function markEveryone(classStudents, status) {
    const records = classStudents.map(student => ({
      studentId: student.id,
      status
    }));

    markClassAttendance(
      classId,
      attendanceDate,
      records,
      user.id
    );
  }

  function deleteHomework(id) {
    if (window.confirm("Delete this homework?")) {
      school.deleteAssignment(id);
    }
  }

  function homeworkPage() {
    return (
      <>
        {role === "teacher" && (
          <Card
            title="Create Homework"
            subtitle="Assign work to your class"
          >
            <form className="dashboard-form" onSubmit={addHomework}>
              <input
                required
                placeholder="Homework title"
                value={homework.title}
                onChange={e => updateHomework("title", e.target.value)}
              />

              <input
                required
                placeholder="Subject"
                value={homework.subject}
                onChange={e => updateHomework("subject", e.target.value)}
              />

              <input
                required
                placeholder="Class (e.g. 10-A)"
                value={homework.classId}
                onChange={e => updateHomework("classId", e.target.value)}
              />

              <textarea
                required
                rows="3"
                placeholder="Homework description"
                value={homework.description}
                onChange={e => updateHomework("description", e.target.value)}
              />

              <label>Due date</label>

              <input
                required
                type="date"
                min={today()}
                value={homework.dueDate}
                onChange={e => updateHomework("dueDate", e.target.value)}
              />

              <button className="dashboard-button" type="submit">
                <Plus size={16} />
                Create Homework
              </button>
            </form>
          </Card>
        )}

        <Card
          title={role === "admin" ? "School Homework" : "Assignments"}
          subtitle={`${visibleHomework.length} assignments`}
        >
          {visibleHomework.length === 0 ? (
            <Empty message="No homework available." />
          ) : (
            visibleHomework.map(item => (
              <div className="teacher-homework-item" key={item.id}>
                <div className="teacher-homework-icon">
                  <BookOpen size={19} />
                </div>

                <div className="teacher-homework-info">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>

                  <div className="teacher-homework-meta">
                    <span>{item.subject}</span>
                    <span>Class {item.classId}</span>
                    <span>Due: {item.dueDate}</span>
                  </div>
                </div>

                {role === "teacher" && item.teacherId === user.id && (
                  <button
                    className="teacher-delete"
                    aria-label="Delete homework"
                    onClick={() => deleteHomework(item.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))
          )}
        </Card>
      </>
    );
  }

  function attendancePage() {
    const classStudents = students.filter(
      student => student.classId === classId
    );

    const dateRecords = classStudents.map(student => {
      const record = school.attendance.find(
        item =>
          item.studentId === student.id &&
          item.date === attendanceDate
      );

      return { student, record };
    });

    const presentCount = dateRecords.filter(
      item => item.record?.status === "present"
    ).length;

    const absentCount = dateRecords.filter(
      item => item.record?.status === "absent"
    ).length;

    const unmarkedCount = classStudents.length - presentCount - absentCount;

    const sortedAttendance = [...visibleAttendance].sort(
      (a, b) => b.date.localeCompare(a.date)
    );

    return (
      <>
        {role === "teacher" && (
          <Card
            title="Daily attendance"
            subtitle={`Class ${classId} · ${classStudents.length} students`}
          >
            <div className="academic-toolbar">
              <label className="academic-date-field">
                <CalendarDays size={17} />
                <span>Attendance date</span>

                <input
                  type="date"
                  value={attendanceDate}
                  onChange={e => setAttendanceDate(e.target.value)}
                />
              </label>

              <div className="academic-bulk-actions">
                <button
                  className="academic-action academic-action-present"
                  type="button"
                  disabled={!classStudents.length}
                  onClick={() => markEveryone(classStudents, "present")}
                >
                  <Check size={15} />
                  Mark all present
                </button>

                <button
                  className="academic-action academic-action-absent"
                  type="button"
                  disabled={!classStudents.length}
                  onClick={() => markEveryone(classStudents, "absent")}
                >
                  <X size={15} />
                  Mark all absent
                </button>
              </div>
            </div>

            <div className="attendance-summary">
              <div>
                <strong>{presentCount}</strong>
                <span>Present</span>
              </div>

              <div>
                <strong>{absentCount}</strong>
                <span>Absent</span>
              </div>

              <div>
                <strong>{unmarkedCount}</strong>
                <span>Not marked</span>
              </div>
            </div>

            {classStudents.length === 0 ? (
              <Empty
                message={`No students are assigned to class ${classId}.`}
              />
            ) : (
              <div className="attendance-list">
                {dateRecords.map(({ student, record }) => (
                  <div className="attendance-row" key={student.id}>
                    <div className="attendance-student">
                      <span className="attendance-avatar">
                        {student.name.charAt(0)}
                      </span>

                      <div>
                        <strong>{student.name}</strong>

                        <small>
                          {record
                            ? `Marked ${record.status}`
                            : "Attendance not marked"}
                        </small>
                      </div>
                    </div>

                    <select
                      aria-label={`Attendance for ${student.name}`}
                      className={`attendance-select ${record?.status || "unmarked"}`}
                      value={record?.status || ""}
                      onChange={e => {
                        if (e.target.value) {
                          school.markAttendance(
                            student.id,
                            classId,
                            attendanceDate,
                            e.target.value,
                            user.id
                          );
                        }
                      }}
                    >
                      <option value="">Not marked</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        <Card
          title="Attendance history"
          subtitle="Latest saved attendance records"
        >
          {visibleAttendance.length === 0 ? (
            <Empty message="No attendance records yet." />
          ) : (
            <div className="attendance-history">
              {sortedAttendance.map(item => (
                <div className="attendance-history-row" key={item.id}>
                  <div>
                    <strong>
                      {role === "student" || role === "parent"
                        ? "Daily attendance"
                        : studentName(item.studentId)}
                    </strong>

                    <span>
                      {item.date} · Class {item.classId}
                    </span>
                  </div>

                  <span className={`attendance-badge ${item.status}`}>
                    {item.status === "present" ? "Present" : "Absent"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </>
    );
  }

  return {
    homeworkPage,
    attendancePage
  };
}
