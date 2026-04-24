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

module.exports = {
  create,
  getByCedula,
  getAll,
  getSubjects,
  getSubjectsByStudent, // 🔥
};