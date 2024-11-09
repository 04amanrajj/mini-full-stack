const express = require("express");
const { Router } = require("express");
const {
  registerUser,
  userData,
  loginUser,
  homePage,
  data,
  deleteUser,
} = require("../controller/note.controller");
const noteRoute = Router();

noteRoute.use(express.json());

noteRoute.get("/", homePage);

noteRoute.post("/register", registerUser);

noteRoute.post("/login", loginUser);

noteRoute.get("/data", data);

noteRoute.get("/user", userData);

noteRoute.delete("/delete:id", deleteUser);

module.exports = { noteRoute };
