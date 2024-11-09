const express = require("express");
const app = express();
const { appRoute } = require("./routes/app.routes");
const cors = require("cors");
const {dbconnection} = require("./configs/db");
require("dotenv").config();

app.use(cors());
app.use("/", appRoute);

const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await dbconnection;
    console.log("Connected to db");
  } catch (error) {
    console.log({ error: error.message });
  }
  console.log(`server running at http://localhost:${port}`);
});
