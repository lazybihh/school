
import { Award, BookOpen, Clock3, Pencil, Plus, Trash2 } from "lucide-react";
import { Card, Empty } from "./shared";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const emptyPeriod = {
  classId: "10-A",
  day: "Monday",
  time: "",
  subject: ""
};

export function createAssessmentPages(context) {
  const {
    role,
    school,
    classId,
    teacherClassIds,
    students,
    studentName,
    resultForm,
    setResultForm,
    saveResult,
    visibleResults,
    periodForm,
    setPeriodForm,
    savePeriod,
    visibleTimetable
  } = context;

  const isTeacher = role === "teacher";
  const canManageTimetable = role === "admin" || isTeacher;

  function updateResult(field, value) {
    setResultForm(previous => ({
      ...previous,
      [field]: value
    }));
  }

  function updatePeriod(field, value) {
    setPeriodForm(previous => ({
      ...previous,
      [field]: value
    }));
  }

  function editResult(result) {
    setResultForm({
      studentId: String(result.studentId),
      subject: result.subject,
      exam: result.exam,
      marks: String(result.marks),
      total: String(result.total)
    });
  }

  function resultsPage() {
    const classStudents = students.filter(
      student => student.classId === classId
    );

    const totalMarks = visibleResults.reduce(
      (sum, result) => sum + Number(result.marks),
      0
    );

    const possibleMarks = visibleResults.reduce(
      (sum, result) => sum + Number(result.total),
      0
    );

    const average = possibleMarks
      ? Math.round((totalMarks / possibleMarks) * 100)
      : 0;

    const isEditing = visibleResults.some(result =>
      result.studentId === Number(resultForm.studentId) &&
      result.subject === resultForm.subject &&
      result.exam === resultForm.exam
    );

    const sortedResults = [...visibleResults].sort(
      (a, b) =>
        b.exam.localeCompare(a.exam) ||
        a.subject.localeCompare(b.subject)
    );

    return (
      <>
        {isTeacher && (
          <Card
            title={isEditing ? "Update exam result" : "Record exam result"}
            subtitle="Saving the same student, subject, and exam updates that result"
          >
            <form className="dashboard-form" onSubmit={saveResult}>
              <label>Student</label>

              <select
                value={resultForm.studentId}
                onChange={e => updateResult("studentId", e.target.value)}
              >
                {classStudents.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>

              <input
                required
                placeholder="Subject"
                value={resultForm.subject}
                onChange={e => updateResult("subject", e.target.value)}
              />

              <input
                required
                placeholder="Exam (e.g. Term 1)"
                value={resultForm.exam}
                onChange={e => updateResult("exam", e.target.value)}
              />

              <input
                required
                type="number"
                min="0"
                placeholder="Marks obtained"
                value={resultForm.marks}
                onChange={e => updateResult("marks", e.target.value)}
              />

              <input
                required
                type="number"
                min="1"
                placeholder="Total marks"
                value={resultForm.total}
                onChange={e => updateResult("total", e.target.value)}
              />

              <button className="dashboard-button" type="submit">
                {isEditing ? "Update result" : "Save result"}
              </button>
            </form>
          </Card>
        )}

        <Card title="Academic performance" subtitle="Published exam results">
          {visibleResults.length === 0 ? (
            <Empty message="No results published yet." />
          ) : (
            <>
              <div className="result-summary">
                <div className="result-summary-icon">
                  <Award size={21} />
                </div>

                <div>
                  <strong>{average}%</strong>
                  <span>
                    Overall score · {totalMarks}/{possibleMarks} marks
                  </span>
                </div>

                <small>{visibleResults.length} subjects</small>
              </div>

              <div className="results-list">
                {sortedResults.map(result => {
                  const percentage = result.total
                    ? Math.round((result.marks / result.total) * 100)
                    : 0;

                  const showStudentName = role === "admin" || isTeacher;

                  return (
                    <div className="result-row" key={result.id}>
                      <div className="result-info">
                        <span className="result-subject-icon">
                          <BookOpen size={17} />
                        </span>

                        <div>
                          <strong>{result.subject}</strong>

                          <span>
                            {showStudentName &&
                              `${studentName(result.studentId)} · `}
                            {result.exam}
                          </span>
                        </div>
                      </div>

                      <div className="result-score">
                        <strong>
                          {result.marks}
                          <span> / {result.total}</span>
                        </strong>

                        <div className="result-progress">
                          <span
                            style={{
                              width: `${Math.min(percentage, 100)}%`
                            }}
                          />
                        </div>
                      </div>

                      <span
                        className={`result-percentage ${
                          percentage >= 40 ? "pass" : "needs-work"
                        }`}
                      >
                        {percentage}%
                      </span>

                      {isTeacher && (
                        <button
                          className="academic-icon-button"
                          type="button"
                          aria-label={`Edit ${result.subject} result for ${studentName(result.studentId)}`}
                          onClick={() => editResult(result)}
                        >
                          <Pencil size={16} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Card>
      </>
    );
  }

  function timetablePage() {
    const assignedClasses = isTeacher
      ? teacherClassIds
      : school.classes.map(item => item.id);

    const classOptions = school.classes.filter(item =>
      assignedClasses.includes(item.id)
    );

    const defaultClass = isTeacher
      ? teacherClassIds[0] || classId
      : school.classes[0]?.id || emptyPeriod.classId;

    const selectedClass = periodForm.classId || defaultClass;

    const [startTime = "", endTime = ""] = periodForm.time.split(" - ");

    const sortedTimetable = [...visibleTimetable].sort(
      (a, b) =>
        days.indexOf(a.day) - days.indexOf(b.day) ||
        a.time.localeCompare(b.time) ||
        a.classId.localeCompare(b.classId)
    );

    function updateTime(field, value) {
      setPeriodForm(previous => {
        const [start = "", end = ""] = previous.time.split(" - ");

        return {
          ...previous,
          time: field === "start"
            ? `${value} - ${end}`
            : `${start} - ${value}`
        };
      });
    }

    function resetPeriod() {
      setPeriodForm({
        ...emptyPeriod,
        classId: defaultClass
      });
    }

    function deletePeriod(period) {
      const confirmed = window.confirm(
        `Delete ${period.subject} on ${period.day}?`
      );

      if (!confirmed) return;

      school.deleteTimetablePeriod(period.id);

      if (periodForm.id === period.id) {
        resetPeriod();
      }
    }

    return (
      <>
        {canManageTimetable && (
          <Card
            title={periodForm.id ? "Edit a timetable period" : "Add a timetable period"}
            subtitle={
              isTeacher
                ? `Add multiple periods to your assigned classes. Current class: ${classId}`
                : "Add as many periods as needed for each class and day"
            }
          >
            <form className="dashboard-form" onSubmit={savePeriod}>
              <label htmlFor="timetable-class">Class</label>

              <select
                id="timetable-class"
                required
                value={selectedClass}
                onChange={e => updatePeriod("classId", e.target.value)}
              >
                {classOptions.length > 0 ? (
                  classOptions.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <option value={selectedClass}>{selectedClass}</option>
                )}
              </select>

              <label htmlFor="timetable-day">Day</label>

              <select
                id="timetable-day"
                required
                value={periodForm.day}
                onChange={e => updatePeriod("day", e.target.value)}
              >
                {days.map(day => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              <label htmlFor="timetable-start">Start time</label>

              <input
                id="timetable-start"
                required
                type="time"
                value={startTime}
                onChange={e => updateTime("start", e.target.value)}
              />

              <label htmlFor="timetable-end">End time</label>

              <input
                id="timetable-end"
                required
                type="time"
                value={endTime}
                onChange={e => updateTime("end", e.target.value)}
              />

              <label htmlFor="timetable-subject">Subject or activity</label>

              <input
                id="timetable-subject"
                required
                placeholder="For example, Mathematics"
                value={periodForm.subject}
                onChange={e => updatePeriod("subject", e.target.value)}
              />

              <button className="dashboard-button" type="submit">
                <Plus size={16} />
                {periodForm.id ? "Update period" : "Add period"}
              </button>

              {periodForm.id && (
                <button
                  className="academic-cancel-button"
                  type="button"
                  onClick={resetPeriod}
                >
                  Cancel editing
                </button>
              )}
            </form>
          </Card>
        )}

        <Card
          title="Weekly timetable"
          subtitle={`${visibleTimetable.length} periods · Each period appears as a row`}
        >
          {visibleTimetable.length === 0 ? (
            <Empty
              message={
                isTeacher
                  ? "No periods for your assigned classes yet. Add the first period above."
                  : "No timetable periods available."
              }
            />
          ) : (
            <div className="timetable-table-wrap">
              <table className="timetable-table">
                <thead>
                  <tr>
                    <th scope="col">Day</th>
                    <th scope="col">Time</th>
                    <th scope="col">Class</th>
                    <th scope="col">Subject / activity</th>

                    {canManageTimetable && (
                      <th scope="col">Actions</th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {sortedTimetable.map(period => {
                    const canEdit = role === "admin" ||
                      (isTeacher && teacherClassIds.includes(period.classId));

                    return (
                      <tr key={period.id}>
                        <td data-label="Day">{period.day}</td>

                        <td data-label="Time">
                          <span className="timetable-time">
                            <Clock3 size={15} />
                            {period.time}
                          </span>
                        </td>

                        <td data-label="Class">{period.classId}</td>

                        <td data-label="Subject / activity">
                          <strong>{period.subject}</strong>
                        </td>

                        {canManageTimetable && (
                          <td data-label="Actions">
                            {canEdit && (
                              <div className="timetable-actions">
                                <button
                                  className="academic-icon-button"
                                  type="button"
                                  aria-label={`Edit ${period.subject} period`}
                                  onClick={() => setPeriodForm({ ...period })}
                                >
                                  <Pencil size={15} />
                                </button>

                                <button
                                  className="academic-icon-button danger"
                                  type="button"
                                  aria-label={`Delete ${period.subject} period`}
                                  onClick={() => deletePeriod(period)}
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </>
    );
  }

  return {
    resultsPage,
    timetablePage
  };
}
