const service = require("../services/student.service");

const create = async (data) => {
  return await service.createStudent(data);
};

const getByCedula = async (cedula) => {
  return await service.getByCedula(cedula);
};

const getAll = async () => {
  return await service.getAll();
};

const getSubjects = async () => {
  return await service.getSubjects();
};

// 🔥
const getSubjectsByStudent = async (student_id) => {
  return await service.getSubjectsByStudent(student_id);
};

const assignSubject = async ({ student_id, subject_id }) => {
  try {
    const result = await service.assignSubject(student_id, subject_id);
    return result;
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  create,
  getByCedula,
  getAll,
  getSubjects,
  getSubjectsByStudent,
  assignSubject,
};