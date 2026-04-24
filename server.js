require("dotenv").config();

const server = require("./src/app");

server.listen(process.env.PORT, () => {
  console.log(`🚀 Student service running on http://localhost:${process.env.PORT}`);
});