import React, { createContext, useContext } from "react";

import useStoredData from "./useStoredData";

const Context = createContext(null);

export function ClassProvider({ children }) {
  const data = useStoredData("eduflow_classes", [
    { id: "6-A", grade: "6", section: "A", teacherId: "" },
    { id: "6-B", grade: "6", section: "B", teacherId: "" },
    { id: "6-C", grade: "6", section: "C", teacherId: "" },
    { id: "6-D", grade: "6", section: "D", teacherId: "" },
    { id: "7-A", grade: "7", section: "A", teacherId: "" },
    { id: "7-B", grade: "7", section: "B", teacherId: "" },
    { id: "7-C", grade: "7", section: "C", teacherId: "" },
    { id: "7-D", grade: "7", section: "D", teacherId: "" },
    { id: "8-A", grade: "8", section: "A", teacherId: "" },
    { id: "8-B", grade: "8", section: "B", teacherId: "" },
    { id: "8-C", grade: "8", section: "C", teacherId: "" },
    { id: "8-D", grade: "8", section: "D", teacherId: "" },
    { id: "9-A", grade: "9", section: "A", teacherId: "" },
    { id: "9-B", grade: "9", section: "B", teacherId: "" },
    { id: "9-C", grade: "9", section: "C", teacherId: "" },
    { id: "9-D", grade: "9", section: "D", teacherId: "" },
    { id: "10-A", grade: "10", section: "A", teacherId: "" },
    { id: "10-B", grade: "10", section: "B", teacherId: "" },
    { id: "10-C", grade: "10", section: "C", teacherId: "" },
    { id: "10-D", grade: "10", section: "D", teacherId: "" },
    { id: "11-A", grade: "11", section: "A", teacherId: "" },
    { id: "11-B", grade: "11", section: "B", teacherId: "" },
    { id: "11-C", grade: "11", section: "C", teacherId: "" },
    { id: "11-D", grade: "11", section: "D", teacherId: "" },
    { id: "12-A", grade: "12", section: "A", teacherId: "" },
    { id: "12-B", grade: "12", section: "B", teacherId: "" },
    { id: "12-C", grade: "12", section: "C", teacherId: "" },
    { id: "12-D", grade: "12", section: "D", teacherId: "" },
  ]);

  return <Context.Provider value={{ data }}>{children}</Context.Provider>;
}

export function useClass() {
  const value = useContext(Context);
  if (!value) throw new Error("useClass must be inside ClassProvider");
  return value;
}
