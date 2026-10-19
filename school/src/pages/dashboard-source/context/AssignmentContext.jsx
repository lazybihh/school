import React, { createContext, useContext } from "react";

import useStoredData from "./useStoredData";

const Context = createContext(null);

export function AssignmentProvider({ children }) {
  const data = useStoredData("eduflow_assignments", []);

  return <Context.Provider value={{ data }}>{children}</Context.Provider>;
}

export function useAssignment() {
  const value = useContext(Context);
  if (!value)
    throw new Error("useAssignment must be inside AssignmentProvider");

  return value;
}
