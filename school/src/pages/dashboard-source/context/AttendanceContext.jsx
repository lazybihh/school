import React, { createContext, useContext } from "react";

import useStoredData from "./useStoredData";

const Context = createContext(null);

export function AttendanceProvider({ children }) {
  const data = useStoredData("eduflow_attendance", []);

  return <Context.Provider value={{ data }}>{children}</Context.Provider>;
}

export function useAttendance() {
  const value = useContext(Context);
  if (!value)
    throw new Error("useAttendance must be inside AttendanceProvider");

  return value;
}
