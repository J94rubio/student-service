const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Service API",
      version: "1.0.0",
      description: "Microservicio para gestión de estudiantes",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // 🔥 importante
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;