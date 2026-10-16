import { createContext, useContext } from "react";
import { createSchoolAcademicMethods } from "./academics";
import { createSchoolAdministrationMethods } from "./administration";
import { createSchoolPeopleMethods } from "./people";
import { useSchoolState } from "./state";

const SchoolContext = createContext();

export function SchoolProvider({ children }) {
  const state = useSchoolState();
  const peopleMethods = createSchoolPeopleMethods(state);
  const academicMethods = createSchoolAcademicMethods(state);
  const administrationMethods = createSchoolAdministrationMethods(state);
  const {
    users, classes, assignments, attendance, results, timetable, notices, fees
  } = state;

  return (
    <SchoolContext.Provider
      value={{
        // Users and classes
        users,
        ...peopleMethods,
        classes,

        // Academics
        assignments,
        attendance,
        results,
        timetable,
        ...academicMethods,

        // School administration
        notices,
        fees,
        ...administrationMethods
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  return useContext(SchoolContext);
}
