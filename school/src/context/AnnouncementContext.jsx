import React, { createContext, useContext } from "react";

import useStoredData from "./useStoredData";

const Context = createContext(null);

export function AnnouncementProvider({ children }) {
  const data = useStoredData("eduflow_announcements", []);

  return <Context.Provider value={{ data }}>{children}</Context.Provider>;
}

export function useAnnouncement() {
  const value = useContext(Context);
  if (!value)
    throw new Error("useAnnouncement must be inside AnnouncementProvider");

  return value;
}
