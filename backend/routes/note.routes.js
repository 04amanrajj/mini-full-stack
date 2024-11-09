const express = require("express");
const { Router } = require("express");

const noteRoute = Router();

noteRoute.use(express.json());

noteRoute.get("/",(req,res)=>{

});

noteRoute.post("/create", );

noteRoute.patch("/update:id", );

noteRoute.delete("/delete:id", );

module.exports = { noteRoute };
