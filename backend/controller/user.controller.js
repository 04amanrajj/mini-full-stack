const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { logger } = require("../middlewares/userLogger.middleware");
const bcrypt = require("bcrypt");

exports.homePage = (req, res) => {
  res.send("its user Homepage");
};

exports.registerUser = async (req, res) => {
  // from details
  const payLoad = req.body;
  try {
    //exists users
    const user = await UserModel.findOne({ email: payLoad.email });
    if (user) {
      return res.status(400).send({ msg: "User already exists" });
    }
    // match password
    if (payLoad.password != payLoad.confirmPassword) {
      return res.status(400).send({ msg: "password didn't match" });
    }
    // empty from
    if (!payLoad) {
      return res.status(400).send({ msg: "fields are empty" });
    }
    //encrypt password
    bcrypt.hash(payLoad.password, 10, async (err, hash) => {
      if (err) {
        res.status(500).send({ err });
      } else {
        payLoad.password = hash;
        const user = new UserModel(payLoad);
        await user.save();
      }
    });
    // send response
    res.status(200).send({ msg: "User registerd" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

exports.loginUser = async (req, res) => {
  // login from data email & password
  const payLoad = req.body;
  try {
    // finding user
    const user = await UserModel.findOne({ email: payLoad.email });
    if (user) {
      //decrypt password to match
      bcrypt.compare(payLoad.password, user.password, (err, result) => {
        if (result) {
          // genrate limited time token
          const token = jwt.sign({userID:user._id}, "jsonwebtoken"/*, { expiresIn: 1120 }*/);
          // save log to file
          logger.info(`${user.name} is logged in`);
          // send response
          res.status(200).send({ msg: "Logged in", token, user });
        } else {
          res.status(404).send({ msg: "Wrong Credntials" });
        }
      });
    } else {
      res.status(404).send({ msg: "User not found" });
      return;
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

exports.data = (req, res) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, "jsonwebtoken", async (err, decoded) => {
      if (err) {
        res.status(403).send({ message: "login first" });
        console.log({ error: err.message });
      } else {
        const data = "HElLO";
        res.status(200).send({ data });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

exports.userData = (req, res) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, "jsonwebtoken", async (err, decoded) => {
      if (err) {
        res.status(403).send({ message: "login first" });
        console.log({ error: err.message });
      } else {
        const data = await UserModel.find();
        res.status(200).send({ data });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await UserModel.findOneAndDelete({ _id });
    if (user) {
      res.status(200).send({ msg: "user deleted" });
    } else {
      res.status(404).send({ msg: "user not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};
