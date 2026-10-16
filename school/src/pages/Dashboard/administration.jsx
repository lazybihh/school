
import { Megaphone, Trash2, Wallet } from "lucide-react";
import { Card, Line, Empty } from "./shared";

export function createAdminPages(context) {
  const {
    role,
    user,
    school,
    student,
    students,
    studentName,

    noticeForm,
    setNoticeForm,
    saveNotice,
    visibleNotices,

    feeForm,
    setFeeForm,
    saveFee,
    visibleFees
  } = context;

  // Form helpers

  function updateNotice(field, value) {
    setNoticeForm(previous => ({
      ...previous,
      [field]: value
    }));
  }

  function updateFeeForm(field, value) {
    setFeeForm(previous => ({
      ...previous,
      [field]: value
    }));
  }

  function updatePayment(fee) {
    const input = window.prompt(
      "Enter total paid amount:",
      String(fee.paidAmount)
    );

    if (input === null || input.trim() === "") {
      return;
    }

    const paid = Number(input);

    if (!Number.isFinite(paid) || paid < 0 || paid > fee.amount) {
      alert("Invalid payment amount.");
      return;
    }

    school.updateFee(fee.id, {
      paidAmount: paid,
      status: paid >= fee.amount ? "paid" : "pending"
    });
  }

  // Announcements page

  function noticesPage() {
    return (
      <>
        {role === "admin" && (
          <Card
            title="Publish Announcement"
            subtitle="Send school notices"
          >
            <form className="dashboard-form" onSubmit={saveNotice}>
              <input
                required
                placeholder="Notice title"
                value={noticeForm.title}
                onChange={e => updateNotice("title", e.target.value)}
              />

              <textarea
                required
                rows="3"
                placeholder="Announcement details"
                value={noticeForm.description}
                onChange={e => updateNotice("description", e.target.value)}
              />

              <label>Audience</label>

              <select
                value={noticeForm.audience}
                onChange={e => updateNotice("audience", e.target.value)}
              >
                <option value="all">Everyone</option>
                <option value="student">Students</option>
                <option value="parent">Parents</option>
                <option value="teacher">Teachers</option>
              </select>

              <button className="dashboard-button" type="submit">
                <Megaphone size={16} />
                Publish
              </button>
            </form>
          </Card>
        )}

        <Card
          title="School Announcements"
          subtitle="Published notices"
        >
          {visibleNotices.length === 0 ? (
            <Empty message="No announcements yet." />
          ) : (
            visibleNotices.map(notice => (
              <div className="teacher-homework-item" key={notice.id}>
                <div className="teacher-homework-icon">
                  <Megaphone size={18} />
                </div>

                <div className="teacher-homework-info">
                  <h4>{notice.title}</h4>
                  <p>{notice.description}</p>

                  <div className="teacher-homework-meta">
                    <span>{notice.date}</span>
                    <span>For: {notice.audience}</span>
                  </div>
                </div>

                {role === "admin" && (
                  <button
                    className="teacher-delete"
                    aria-label="Delete notice"
                    onClick={() => school.deleteNotice(notice.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            ))
          )}
        </Card>
      </>
    );
  }

  // Fees page

  function feesPage() {
    return (
      <>
        {role === "admin" && (
          <Card
            title="Create Fee Record"
            subtitle="Manage student fees"
          >
            <form className="dashboard-form" onSubmit={saveFee}>
              <label>Student</label>

              <select
                value={feeForm.studentId}
                onChange={e => updateFeeForm("studentId", e.target.value)}
              >
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>

              <input
                required
                placeholder="Fee title"
                value={feeForm.title}
                onChange={e => updateFeeForm("title", e.target.value)}
              />

              <input
                required
                type="number"
                min="1"
                placeholder="Total amount"
                value={feeForm.amount}
                onChange={e => updateFeeForm("amount", e.target.value)}
              />

              <input
                required
                type="number"
                min="0"
                placeholder="Paid amount"
                value={feeForm.paidAmount}
                onChange={e => updateFeeForm("paidAmount", e.target.value)}
              />

              <label>Due Date</label>

              <input
                required
                type="date"
                value={feeForm.dueDate}
                onChange={e => updateFeeForm("dueDate", e.target.value)}
              />

              <button className="dashboard-button" type="submit">
                Add Fee Record
              </button>
            </form>
          </Card>
        )}

        <Card
          title="Fee Records"
          subtitle="Student payment information"
        >
          {visibleFees.length === 0 ? (
            <Empty message="No fee records available." />
          ) : (
            visibleFees.map(fee => (
              <div className="teacher-homework-item" key={fee.id}>
                <div className="teacher-homework-icon">
                  <Wallet size={18} />
                </div>

                <div className="teacher-homework-info">
                  <h4>{fee.title}</h4>

                  <p>
                    {studentName(fee.studentId)} · Due {fee.dueDate}
                  </p>

                  <div className="teacher-homework-meta">
                    <span>Total: ₹{fee.amount}</span>
                    <span>Paid: ₹{fee.paidAmount}</span>
                    <span>Balance: ₹{fee.amount - fee.paidAmount}</span>
                  </div>
                </div>

                {role === "admin" && (
                  <button
                    className="dashboard-button"
                    onClick={() => updatePayment(fee)}
                  >
                    Update
                  </button>
                )}
              </div>
            ))
          )}
        </Card>
      </>
    );
  }

  // Profile page

  function profilePage() {
    return (
      <Card title="Account Details">
        <Line label="Name" value={user.name} />
        <Line label="Email" value={user.email} />
        <Line label="Role" value={user.role} />

        {student && (
          <Line
            label="Student"
            value={`${student.name} (${student.classId})`}
          />
        )}
      </Card>
    );
  }

  return {
    noticesPage,
    feesPage,
    profilePage
  };
}
