const express = require("express");
const app = express();
const cors = require("cors");
const {dbconnection} = require("./configs/db");
const { userRoute } = require("./routes/user.routes");
require("dotenv").config();

app.use(cors());
app.use("/", userRoute);

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
