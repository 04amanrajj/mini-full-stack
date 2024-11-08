const express = require("express");
const { Router } = require("express");
const {
  registerUser,
  userData,
  loginUser,
  homePage,
  data,
  deleteUser,
} = require("../controller/user.controller");
const { UserModel } = require("../models/user.model");
const appRoute = Router();

appRoute.use(express.json());

appRoute.get("/", homePage);

appRoute.post("/register", registerUser);

appRoute.post("/login", loginUser);

appRoute.get("/data", data);

appRoute.get("/user", userData);

appRoute.delete("/delete:id", deleteUser);

module.exports = { appRoute };
