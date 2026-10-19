import React, { createContext, useContext } from "react";

import useStoredData from "./useStoredData";

const Context = createContext(null);

export function FeeProvider({ children }) {
  const data = useStoredData("eduflow_fees", []);

  return <Context.Provider value={{ data }}>{children}</Context.Provider>;
}

export function useFee() {
  const value = useContext(Context);
  if (!value) throw new Error("useFee must be inside FeeProvider");
  return value;
}
