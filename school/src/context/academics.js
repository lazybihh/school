
export function createSchoolAcademicMethods(context) {
  const {
    assignments,
    setAssignments,
    attendance,
    setAttendance,
    results,
    setResults,
    timetable,
    setTimetable
  } = context;

  // Assignments

  function addAssignment(homework) {
    const newAssignment = {
      ...homework,
      id: Date.now(),
      createdAt: new Date().toISOString().split("T")[0]
    };

    setAssignments(previous => [newAssignment, ...previous]);
  }

  function deleteAssignment(id) {
    setAssignments(previous =>
      previous.filter(item => item.id !== id)
    );
  }

  function getClassAssignments(classId) {
    return assignments.filter(item => item.classId === classId);
  }

  function getTeacherAssignments(teacherId) {
    return assignments.filter(item => item.teacherId === teacherId);
  }

  // Attendance

  function markAttendance(studentId, classId, date, status, teacherId) {
    setAttendance(previous => {
      const existing = previous.find(
        item => item.studentId === studentId && item.date === date
      );

      if (existing) {
        return previous.map(item =>
          item.id === existing.id
            ? { ...item, status, classId, markedBy: teacherId }
            : item
        );
      }

      const newRecord = {
        id: Date.now(),
        studentId,
        classId,
        date,
        status,
        markedBy: teacherId
      };

      return [newRecord, ...previous];
    });
  }

  function markClassAttendance(classId, date, records, teacherId) {
    setAttendance(previous => {
      const updated = [...previous];

      records.forEach(record => {
        const existingIndex = updated.findIndex(
          item => item.studentId === record.studentId && item.date === date
        );

        const newRecord = {
          id: existingIndex >= 0
            ? updated[existingIndex].id
            : Date.now() + Math.floor(Math.random() * 100000),
          studentId: record.studentId,
          classId,
          date,
          status: record.status,
          markedBy: teacherId
        };

        if (existingIndex >= 0) {
          updated[existingIndex] = newRecord;
        } else {
          updated.unshift(newRecord);
        }
      });

      return updated;
    });
  }

  function getStudentAttendance(studentId) {
    return attendance.filter(item => item.studentId === studentId);
  }

  function getClassAttendance(classId) {
    return attendance.filter(item => item.classId === classId);
  }

  function getAttendanceForDate(classId, date) {
    return attendance.filter(
      item => item.classId === classId && item.date === date
    );
  }

  function getAttendanceDates(classId) {
    const dates = attendance
      .filter(item => item.classId === classId)
      .map(item => item.date);

    return [...new Set(dates)].sort((a, b) => b.localeCompare(a));
  }

  // Results

  function addResult(result) {
    setResults(previous => {
      const existing = previous.find(
        item =>
          item.studentId === result.studentId &&
          item.subject === result.subject &&
          item.exam === result.exam
      );

      if (existing) {
        return previous.map(item =>
          item.id === existing.id
            ? { ...item, ...result }
            : item
        );
      }

      const newResult = {
        ...result,
        id: Date.now()
      };

      return [newResult, ...previous];
    });
  }

  function deleteResult(id) {
    setResults(previous =>
      previous.filter(item => item.id !== id)
    );
  }

  function getStudentResults(studentId) {
    return results.filter(item => item.studentId === studentId);
  }

  // Timetable

  function addTimetablePeriod(period) {
    const newPeriod = {
      ...period,
      id: Date.now()
    };

    setTimetable(previous => [newPeriod, ...previous]);
  }

  function updateTimetablePeriod(id, changes) {
    setTimetable(previous =>
      previous.map(item =>
        item.id === id
          ? { ...item, ...changes, id }
          : item
      )
    );
  }

  function deleteTimetablePeriod(id) {
    setTimetable(previous =>
      previous.filter(item => item.id !== id)
    );
  }

  function getClassTimetable(classId) {
    return timetable.filter(item => item.classId === classId);
  }

  return {
    addAssignment,
    deleteAssignment,
    getClassAssignments,
    getTeacherAssignments,
    markAttendance,
    markClassAttendance,
    getStudentAttendance,
    getClassAttendance,
    getAttendanceForDate,
    getAttendanceDates,
    addResult,
    deleteResult,
    getStudentResults,
    addTimetablePeriod,
    updateTimetablePeriod,
    deleteTimetablePeriod,
    getClassTimetable
  };
}
