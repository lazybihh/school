
export function createSchoolAdministrationMethods(context) {
  const { notices, setNotices, fees, setFees } = context;

  // Announcements

  function addNotice(notice) {
    const newNotice = {
      ...notice,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0]
    };

    setNotices(previous => [newNotice, ...previous]);
  }

  function deleteNotice(id) {
    setNotices(previous =>
      previous.filter(item => item.id !== id)
    );
  }

  function getNoticesForRole(role) {
    return notices.filter(
      item => item.audience === "all" || item.audience === role
    );
  }

  // Fees

  function addFee(fee) {
    const newFee = {
      ...fee,
      id: Date.now()
    };

    setFees(previous => [newFee, ...previous]);
  }

  function updateFee(id, changes) {
    setFees(previous =>
      previous.map(item =>
        item.id === id
          ? { ...item, ...changes }
          : item
      )
    );
  }

  function getStudentFees(studentId) {
    return fees.filter(item => item.studentId === studentId);
  }

  return {
    addNotice,
    deleteNotice,
    getNoticesForRole,
    addFee,
    updateFee,
    getStudentFees
  };
}
