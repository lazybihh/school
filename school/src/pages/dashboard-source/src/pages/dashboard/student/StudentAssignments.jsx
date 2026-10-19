import React from "react";

import { Panel, Stats, Table, NoticeList, ReportForm } from "../shared/UI";
import {
  today,
  attendanceRate,
  feeStatus,
  relevantNotices,
} from "../shared/school";

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

  return (
    <>
      <Panel
        title="My homework"
        subtitle="Submit a text answer. Files are not stored in localStorage."
      >
        {a.length ? (
          a.map((x) => {
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
                          s.submissions.update(sub.id, {
                            content: answers[x.id],
                            date: today(),
                            status: "Submitted",
                          });
                          setAnswers({ ...answers, [x.id]: "" });
                        }}
                      >
                        <label className="wide">
                          Revised answer
                          <textarea
                            required
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
                      s.submissions.add({
                        assignmentId: x.id,
                        studentId: student.id,
                        content: answers[x.id],
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
          <p className="role-empty">No assignments for your class yet.</p>
        )}
      </Panel>
    </>
  );
}
