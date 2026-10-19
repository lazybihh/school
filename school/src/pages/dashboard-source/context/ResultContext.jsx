import React, { createContext, useContext } from "react";

import useStoredData from "./useStoredData";

const Context = createContext(null);

export function ResultProvider({ children }) {
  const data = useStoredData("eduflow_results", []);

  return <Context.Provider value={{ data }}>{children}</Context.Provider>;
}

export function useResult() {
  const value = useContext(Context);
  if (!value) throw new Error("useResult requires ResultProvider");
  return value;
}
