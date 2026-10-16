import { createAssessmentPages } from "./assessments";
import { createClassroomPages } from "./assessments2";

export function createAcademicPages(context) {
  return {
    ...createClassroomPages(context),
    ...createAssessmentPages(context)
  };
}
