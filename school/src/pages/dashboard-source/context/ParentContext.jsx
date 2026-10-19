import React, { createContext, useContext } from "react";

import useStoredData from "./useStoredData";

const Context = createContext(null);

export function ParentProvider({ children }) {
  const data = useStoredData("eduflow_parents", []);

  return <Context.Provider value={{ data }}>{children}</Context.Provider>;
}

export function useParent() {
  const value = useContext(Context);
  if (!value) throw new Error("useParent must be inside ParentProvider");
  return value;
}
