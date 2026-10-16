
export function createSchoolPeopleMethods(context) {
  const {
    users,
    setUsers,
    classes,
    setClasses,
    setAttendance,
    setResults,
    setFees,
    setTimetable
  } = context;

  // User Management

  function addStudent(student) {
    const newStudent = {
      ...student,
      id: Date.now(),
      role: "student"
    };

    setUsers(previous => [...previous, newStudent]);

    return newStudent;
  }

  function addManagedUser(userData) {
    const allowedRoles = ["student", "teacher", "parent"];

    if (!allowedRoles.includes(userData.role)) {
      return {
        success: false,
        message: "Only student, teacher, and parent accounts can be managed here."
      };
    }

    const email = userData.email.trim().toLowerCase();

    const emailExists = users.some(
      user => user.email.toLowerCase() === email
    );

    if (emailExists) {
      return {
        success: false,
        message: "An account with this email already exists."
      };
    }

    const nextId = users.reduce(
      (largestId, user) => Math.max(largestId, Number(user.id) || 0),
      0
    ) + 1;

    const createdUser = {
      ...userData,
      id: nextId,
      name: userData.name.trim(),
      email,
      role: userData.role,
      classId: userData.role === "parent" ? undefined : userData.classId || null,
      childId: userData.role === "parent" && userData.childId
        ? Number(userData.childId)
        : undefined
    };

    setUsers(previous => [...previous, createdUser]);

    return { success: true, user: createdUser };
  }

  function updateManagedUser(userId, changes) {
    const existingUser = users.find(user => user.id === userId);

    if (!existingUser || existingUser.role === "admin") {
      return {
        success: false,
        message: "Administrator accounts cannot be edited here."
      };
    }

    const email = changes.email?.trim().toLowerCase();

    const emailExists = email && users.some(
      user => user.id !== userId && user.email.toLowerCase() === email
    );

    if (emailExists) {
      return {
        success: false,
        message: "An account with this email already exists."
      };
    }

    const updatedUser = {
      ...existingUser,
      ...changes,
      name: changes.name?.trim() || existingUser.name,
      email: email || existingUser.email,
      role: existingUser.role,
      classId: existingUser.role === "parent"
        ? undefined
        : changes.classId || null,
      childId: existingUser.role === "parent"
        ? changes.childId
          ? Number(changes.childId)
          : undefined
        : undefined
    };

    setUsers(previous =>
      previous.map(user =>
        user.id === userId ? updatedUser : user
      )
    );

    const loggedInUser = JSON.parse(
      localStorage.getItem("eduflowUser") || "null"
    );

    if (loggedInUser?.id === userId) {
      const updatedSession = {
        ...loggedInUser,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        classId: updatedUser.classId,
        childId: updatedUser.childId
      };

      localStorage.setItem(
        "eduflowUser",
        JSON.stringify(updatedSession)
      );
    }

    return { success: true, user: updatedUser };
  }

  function deleteManagedUser(userId) {
    const existingUser = users.find(user => user.id === userId);

    if (!existingUser || existingUser.role === "admin") {
      return {
        success: false,
        message: "Administrator accounts cannot be deleted here."
      };
    }

    setUsers(previous =>
      previous.filter(user => user.id !== userId)
    );

    // Remove student records and unlink their parent

    if (existingUser.role === "student") {
      setAttendance(previous =>
        previous.filter(item => item.studentId !== userId)
      );

      setResults(previous =>
        previous.filter(item => item.studentId !== userId)
      );

      setFees(previous =>
        previous.filter(item => item.studentId !== userId)
      );

      setUsers(previous =>
        previous.map(user =>
          user.role === "parent" && user.childId === userId
            ? { ...user, childId: undefined }
            : user
        )
      );
    }

    // Remove teacher assignment from classes

    if (existingUser.role === "teacher") {
      setClasses(previous =>
        previous.map(item =>
          item.teacherId === userId
            ? { ...item, teacherId: null }
            : item
        )
      );
    }

    return { success: true };
  }

  function deleteStudent(studentId) {
    return deleteManagedUser(studentId);
  }

  function updateStudent(studentId, changes) {
    setUsers(previous =>
      previous.map(user =>
        user.id === studentId
          ? { ...user, ...changes }
          : user
      )
    );
  }

  function getStudents() {
    return users.filter(user => user.role === "student");
  }

  function getTeachers() {
    return users.filter(user => user.role === "teacher");
  }

  function getUserById(id) {
    return users.find(user => user.id === Number(id));
  }

  // Class Management

  function addClass(newClass) {
    const classId = newClass.name
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "-");

    const classExists = classes.some(item => item.id === classId);

    if (classExists) {
      return {
        success: false,
        message: "This class already exists."
      };
    }

    const createdClass = {
      id: classId,
      name: newClass.name.trim(),
      teacherId: newClass.teacherId
        ? Number(newClass.teacherId)
        : null
    };

    setClasses(previous => [...previous, createdClass]);

    return {
      success: true,
      classData: createdClass
    };
  }

  function updateClass(classId, changes) {
    const updatedName = changes.name?.trim();

    const normalizedId = updatedName
      ?.toUpperCase()
      .replace(/\s+/g, "-");

    if (updatedName) {
      const classExists = classes.some(
        item => item.id !== classId && item.id === normalizedId
      );

      if (classExists) {
        return {
          success: false,
          message: "A class with this name already exists."
        };
      }
    }

    setClasses(previous =>
      previous.map(item => {
        if (item.id !== classId) return item;

        const teacherId = changes.teacherId === undefined
          ? item.teacherId
          : changes.teacherId
            ? Number(changes.teacherId)
            : null;

        return {
          ...item,
          ...changes,
          name: updatedName || item.name,
          teacherId
        };
      })
    );

    return { success: true };
  }

  function deleteClass(classId) {
    setClasses(previous =>
      previous.filter(item => item.id !== classId)
    );

    setUsers(previous =>
      previous.map(user =>
        user.classId === classId
          ? { ...user, classId: null }
          : user
      )
    );

    setTimetable(previous =>
      previous.filter(period => period.classId !== classId)
    );
  }

  function getClassById(classId) {
    return classes.find(item => item.id === classId);
  }

  function getClassStudents(classId) {
    return users.filter(
      user => user.role === "student" && user.classId === classId
    );
  }

  return {
    addStudent,
    addManagedUser,
    updateManagedUser,
    deleteManagedUser,
    deleteStudent,
    updateStudent,
    getStudents,
    getTeachers,
    getUserById,
    addClass,
    updateClass,
    deleteClass,
    getClassById,
    getClassStudents
  };
}
