const parseBody = require("../utils/bodyParser");
const controller = require("../controllers/student.controller");

const studentRoutes = async (req, res, pathname) => {

  // 🔥 POST /students
  if (pathname === "/students" && req.method === "POST") {
    const body = await parseBody(req);
    const result = await controller.create(body);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(result));
  }

  // 🔥 GET /students
  if (pathname === "/students" && req.method === "GET") {
    const result = await controller.getAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(result));
  }

  // 🔥 GET /subjects
  if (pathname === "/subjects" && req.method === "GET") {
    const result = await controller.getSubjects();

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(result));
  }

  // 🔥 GET /subjects/student/:id  — ANTES de /students/:cedula para que no colisione
  if (pathname.startsWith("/subjects/student/") && req.method === "GET") {
    const student_id = pathname.split("/")[3];
    const result = await controller.getSubjectsByStudent(student_id);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(result));
  }

  // 🔥 GET /students/:cedula
  if (pathname.startsWith("/students/") && req.method === "GET") {
    const cedula = pathname.split("/")[2];
    const result = await controller.getByCedula(cedula);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(result));
  }

  return false;
};

module.exports = studentRoutes;