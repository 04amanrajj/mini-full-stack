require("dotenv").config()
const PORT = process.env.PORT;
exports.baseURL = `http://localhost:${PORT}/`;
