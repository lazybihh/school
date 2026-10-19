import React, { createContext, useContext } from "react";

import useStoredData from "./useStoredData";

const Context = createContext(null);

export function TimetableProvider({ children }) {
  const data = useStoredData("eduflow_timetables", []);

  return <Context.Provider value={{ data }}>{children}</Context.Provider>;
}

export function useTimetable() {
  const value = useContext(Context);
  if (!value) throw new Error("useTimetable requires TimetableProvider");
  return value;
}
