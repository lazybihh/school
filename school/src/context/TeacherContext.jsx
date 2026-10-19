import React, { createContext, useContext } from "react";

import useStoredData from "./useStoredData";
import { demoSchoolRecords } from "../data/demoSchoolRecords";

const Context = createContext(null);

export function TeacherProvider({ children }) {
  const data = useStoredData(
    "eduflow_teachers",
    demoSchoolRecords.teachers,
    true,
  );

  return <Context.Provider value={{ data }}>{children}</Context.Provider>;
}

export function useTeacher() {
  const value = useContext(Context);
  if (!value) throw new Error("useTeacher must be inside TeacherProvider");
  return value;
}
