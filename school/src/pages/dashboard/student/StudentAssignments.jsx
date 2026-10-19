import React from "react";

import { Panel, Stats, Table, NoticeList, ReportForm } from "../shared/UI";
import {
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";
import DashboardFilters, {
  useDashboardFilters,
} from "../shared/DashboardFilters";
import { SUBMISSION_STATUS_OPTIONS } from "../shared/schoolOptions";

export default function StudentAssignments({ view }) {
  const {
    s,
    student,
    teacher,
    a,
    attendance,
    results,
    fees,
    periods,
    submission,
    answers,
    setAnswers,
  } = view;
  const assignmentStatus = (assignment) =>
    submission(assignment.id)?.status || "Pending";
  const assignmentFilters = [
    { key: "subject", label: "Subject", includeDynamic: true },
    {
      key: "status",
      label: "Status",
      options: SUBMISSION_STATUS_OPTIONS,
      value: assignmentStatus,
    },
    { key: "due", label: "Due date", type: "date" },
  ];
  const assignmentState = useDashboardFilters(
    a,
    assignmentFilters,
    [
      "title",
      "subject",
      "description",
      "due",
      { value: assignmentStatus },
    ],
  );

  return (
    <>
      <Panel
        title="My homework"
        subtitle="Submit a text answer. Files are not stored in localStorage."
      >
        <DashboardFilters
          state={assignmentState}
          filters={assignmentFilters}
          items={a}
        />
        {assignmentState.filteredItems.length ? (
          assignmentState.filteredItems.map((x) => {
            const sub = submission(x.id);

            return (
              <article className="role-list" key={x.id}>
                <strong>
                  {x.title} · {x.subject}
                </strong>
                <small>
                  {teacher(x.teacherId)} · Due {x.due} ·{" "}
                  {sub?.status || "Pending"}
                </small>
                <p>{x.description}</p>
                {sub ? (
                  <>
                    <p>
                      <b>Your submission:</b> {sub.content}
                    </p>
                    {sub.feedback && (
                      <p>
                        <b>Feedback:</b> {sub.feedback}
                      </p>
                    )}
                    {sub.marks !== undefined && sub.marks !== "" && (
                      <p>
                        <b>Marks:</b> {sub.marks}
                      </p>
                    )}
                    {sub.status === "Resubmit" && (
                      <form
                        className="role-form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const content = (answers[x.id] || "").trim();
                          if (!content) return;

                          s.submissions.update(sub.id, {
                            content,
                            date: today(),
                            status: "Submitted",
                            feedback: "",
                            marks: "",
                          });
                          setAnswers({ ...answers, [x.id]: "" });
                        }}
                      >
                        <label className="wide">
                          Revised answer
                          <textarea
                            required
                            minLength={1}
                            value={answers[x.id] || ""}
                            onChange={(e) =>
                              setAnswers({ ...answers, [x.id]: e.target.value })
                            }
                          />
                        </label>
                        <button className="role-primary">Resubmit</button>
                      </form>
                    )}
                  </>
                ) : (
                  <form
                    className="role-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const content = (answers[x.id] || "").trim();
                      if (!content) return;

                      s.submissions.add({
                        assignmentId: x.id,
                        studentId: student.id,
                        content,
                        date: today(),
                        status: "Submitted",
                        feedback: "",
                        marks: "",
                      });
                      setAnswers({ ...answers, [x.id]: "" });
                    }}
                  >
                    <label className="wide">
                      Your answer
                      <textarea
                        required
                        minLength={1}
                        value={answers[x.id] || ""}
                        onChange={(e) =>
                          setAnswers({ ...answers, [x.id]: e.target.value })
                        }
                      />
                    </label>
                    <button className="role-primary">Submit homework</button>
                  </form>
                )}
              </article>
            );
          })
        ) : (
          a.length === 0 && (
            <p className="role-empty">No assignments for your class yet.</p>
          )
        )}
      </Panel>
    </>
  );
}
