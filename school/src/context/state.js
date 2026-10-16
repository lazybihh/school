
import { useEffect, useState } from "react";
import { loadData } from "./storage";

import {
  demoAssignments,
  demoAttendance,
  demoResults,
  demoTimetable,
  demoNotices,
  demoFees,
  demoClasses,
  demoUsers
} from "./data";

export function useSchoolState() {
  // Load saved school data

  const [assignments, setAssignments] = useState(() =>
    loadData("eduflowAssignments", demoAssignments)
  );

  const [attendance, setAttendance] = useState(() =>
    loadData("eduflowAttendance", demoAttendance)
  );

  const [results, setResults] = useState(() =>
    loadData("eduflowResults", demoResults)
  );

  const [timetable, setTimetable] = useState(() =>
    loadData("eduflowTimetable", demoTimetable)
  );

  const [notices, setNotices] = useState(() =>
    loadData("eduflowNotices", demoNotices)
  );

  const [fees, setFees] = useState(() =>
    loadData("eduflowFees", demoFees)
  );

  const [classes, setClasses] = useState(() =>
    loadData("eduflowClasses", demoClasses)
  );

  const [users, setUsers] = useState(() =>
    loadData("eduflowUsers", demoUsers)
  );

  // Save changes to localStorage

  useEffect(() => {
    localStorage.setItem("eduflowAssignments", JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem("eduflowAttendance", JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem("eduflowResults", JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem("eduflowTimetable", JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem("eduflowNotices", JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem("eduflowFees", JSON.stringify(fees));
  }, [fees]);

  useEffect(() => {
    localStorage.setItem("eduflowClasses", JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem("eduflowUsers", JSON.stringify(users));
  }, [users]);

  return {
    assignments,
    setAssignments,
    attendance,
    setAttendance,
    results,
    setResults,
    timetable,
    setTimetable,
    notices,
    setNotices,
    fees,
    setFees,
    classes,
    setClasses,
    users,
    setUsers
  };
}