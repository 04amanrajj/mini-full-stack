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
const userRoute = Router();

userRoute.use(express.json());

userRoute.get("/", homePage);

userRoute.post("/register", registerUser);

userRoute.post("/login", loginUser);

userRoute.get("/data", data);

userRoute.get("/user", userData);

userRoute.delete("/delete:id", deleteUser);

module.exports = { userRoute };
