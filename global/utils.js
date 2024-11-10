import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const baseURL = `http://localhost:${PORT}/`;
export { baseURL };
