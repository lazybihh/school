import React, { createContext, useContext } from "react";

import useStoredData from "./useStoredData";

const Context = createContext(null);

export function SubmissionProvider({ children }) {
  const data = useStoredData("eduflow_submissions", []);

  return <Context.Provider value={{ data }}>{children}</Context.Provider>;
}

export function useSubmission() {
  const value = useContext(Context);
  if (!value) throw new Error("useSubmission requires SubmissionProvider");
  return value;
}
