import React, { createContext, useContext } from "react";

import useStoredData from "./useStoredData";

const Context = createContext(null);

export function ReportProvider({ children }) {
  const data = useStoredData("eduflow_reports", []);

  return <Context.Provider value={{ data }}>{children}</Context.Provider>;
}

export function useReport() {
  const value = useContext(Context);
  if (!value) throw new Error("useReport must be inside ReportProvider");
  return value;
}
