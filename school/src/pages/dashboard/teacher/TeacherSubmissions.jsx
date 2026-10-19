import React, { useState } from "react";

import { Panel, Table } from "../shared/UI";
import DashboardFilters, {
  useDashboardFilters,
} from "../shared/DashboardFilters";
import {
  SECTION_OPTIONS,
  SUBMISSION_STATUS_OPTIONS,
} from "../shared/schoolOptions";

export default function TeacherSubmissions({ view }) {
  const { s, assignments, subs, name } = view;
  const [selectedId, setSelectedId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [marks, setMarks] = useState("");

  const selectedSubmission = subs.find(
    (submission) => String(submission.id) === String(selectedId),
  );
  const assignment = selectedSubmission
    ? assignments.find(
        (item) =>
          String(item.id) === String(selectedSubmission.assignmentId),
      )
    : null;
  const submissionFilters = [
    {
      key: "assignmentId",
      label: "Assignment",
      includeDynamic: true,
      value: (submission) =>
        assignments.find(
          (item) => String(item.id) === String(submission.assignmentId),
        )?.title,
    },
    {
      key: "classId",
      label: "Class",
      options: [
        ...new Set(assignments.map((assignment) => assignment.classId)),
      ],
      value: (submission) =>
        assignments.find(
          (item) => String(item.id) === String(submission.assignmentId),
        )?.classId,
    },
    {
      key: "section",
      label: "Section",
      options: SECTION_OPTIONS,
      value: (submission) =>
        String(
          assignments.find(
            (item) => String(item.id) === String(submission.assignmentId),
          )?.classId || "",
        ).split("-")[1],
    },
    {
      key: "subject",
      label: "Subject",
      includeDynamic: true,
      value: (submission) =>
        assignments.find(
          (item) => String(item.id) === String(submission.assignmentId),
        )?.subject,
    },
    {
      key: "studentId",
      label: "Student",
      includeDynamic: true,
      value: (submission) => name(submission.studentId),
    },
    {
      key: "status",
      label: "Status",
      options: SUBMISSION_STATUS_OPTIONS,
    },
    { key: "date", label: "Submission date", type: "date" },
  ];
  const submissionState = useDashboardFilters(
    subs,
    submissionFilters,
    [
      "content",
      "date",
      "status",
      { value: (submission) => name(submission.studentId) },
      {
        value: (submission) =>
          assignments.find(
            (item) => String(item.id) === String(submission.assignmentId),
          )?.title,
      },
    ],
  );

  function openSubmission(submission) {
    setSelectedId(submission.id);
    setFeedback(submission.feedback || "");
    setMarks(
      submission.marks === undefined || submission.marks === null
        ? ""
        : String(submission.marks),
    );
  }

  function saveReview(status) {
    if (!selectedSubmission) {
      return;
    }

    s.submissions.update(selectedSubmission.id, {
      feedback,
      marks,
      status,
    });
    setSelectedId("");
  }

  return (
    <>
      <Panel title="Review student submissions">
        <DashboardFilters
          state={submissionState}
          filters={submissionFilters}
          items={subs}
        />
        <Table
          headers={["Student", "Assignment", "Submitted", "Status", "Review"]}
          rows={submissionState.filteredItems.map((submission) => {
            const relatedAssignment = assignments.find(
              (item) =>
                String(item.id) === String(submission.assignmentId),
            );

            return [
              name(submission.studentId),
              relatedAssignment?.title || "Assignment unavailable",
              submission.date,
              submission.status,
              <button
                className="role-secondary"
                onClick={() => openSubmission(submission)}
              >
                View Submission
              </button>,
            ];
          })}
        />
      </Panel>

      {selectedSubmission && (
        <div
          className="submission-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedId("");
            }
          }}
        >
          <section
            className="submission-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="submission-modal-title"
          >
            <header className="submission-modal-header">
              <div>
                <span className="submission-modal-kicker">
                  STUDENT SUBMISSION
                </span>
                <h2 id="submission-modal-title">
                  {assignment?.title || "Assignment unavailable"}
                </h2>
              </div>
              <button
                className="submission-modal-close"
                type="button"
                aria-label="Close submission"
                onClick={() => setSelectedId("")}
              >
                ×
              </button>
            </header>

            <div className="submission-modal-details">
              <div>
                <span>Student</span>
                <strong>{name(selectedSubmission.studentId)}</strong>
              </div>
              <div>
                <span>Submitted</span>
                <strong>{selectedSubmission.date || "Not specified"}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{selectedSubmission.status || "Submitted"}</strong>
              </div>
            </div>

            {assignment?.description && (
              <div className="submission-assignment-description">
                <h3>Assignment instructions</h3>
                <p>{assignment.description}</p>
              </div>
            )}

            <div className="submission-answer">
              <h3>Student's answer</h3>
              <p>{selectedSubmission.content || "No answer text was saved."}</p>
            </div>

            <p className="submission-attachment-note">
              File attachments are not supported in this browser-only demo.
            </p>

            <form
              className="role-form submission-review-form"
              onSubmit={(event) => {
                event.preventDefault();
                saveReview("Checked");
              }}
            >
              <h3 className="wide">Teacher review</h3>
              <label className="wide">
                Feedback
                <textarea
                  value={feedback}
                  onChange={(event) => setFeedback(event.target.value)}
                  placeholder="Write feedback for the student"
                />
              </label>
              <label>
                Marks
                <input
                  type="number"
                  min="0"
                  value={marks}
                  onChange={(event) => setMarks(event.target.value)}
                  placeholder="Optional"
                />
              </label>
              <div className="submission-review-actions wide">
                <button className="role-primary" type="submit">
                  Save review
                </button>
                <button
                  className="role-secondary"
                  type="button"
                  onClick={() => saveReview("Resubmit")}
                >
                  Request resubmission
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
