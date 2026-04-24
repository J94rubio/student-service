const pool = require("../config/db");

// Crear estudiante + asignar materia
const createStudent = async (data) => {
  const { cedula, nombre, correo, celular, subject_id } = data;

  // Usamos transacción para que ambas inserciones sean atómicas
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO students (cedula, nombre, correo, celular)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [cedula, nombre, correo, celular]
    );

    const student = result.rows[0];

    // 🔥 Asignar materia al estudiante recién creado
    if (subject_id) {
      await client.query(
        `INSERT INTO student_subjects (student_id, subject_id)
         VALUES ($1, $2)`,
        [student.id, subject_id]
      );
    }

    await client.query("COMMIT");
    return student;

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// Buscar por cédula
const getByCedula = async (cedula) => {
  const result = await pool.query(
    `SELECT * FROM students WHERE cedula = $1`,
    [cedula]
  );

  return result.rows[0];
};

// Listar todos
const getAll = async () => {
  const result = await pool.query(`SELECT * FROM students`);
  return result.rows;
};

// Listar Materias
const getSubjects = async () => {
  const result = await pool.query(`SELECT * FROM subjects`);
  return result.rows;
};

// Materias de un estudiante (ahora via student_subjects)
const getSubjectsByStudent = async (student_id) => {
  const result = await pool.query(
    `SELECT s.id, s.name
     FROM subjects s
     INNER JOIN student_subjects ss ON ss.subject_id = s.id
     WHERE ss.student_id = $1
     ORDER BY s.name`,
    [student_id]
  );
  return result.rows;
};

module.exports = {
  createStudent,
  getByCedula,
  getAll,
  getSubjects,
  getSubjectsByStudent,
};