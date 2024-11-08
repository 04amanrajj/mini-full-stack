const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { logger } = require("../middlewares/userLogger.middleware");
const bcrypt = require("bcrypt");
exports.homePage = (req, res) => {
  res.send("its Homepage");
};

exports.registerUser = (req, res) => {
  const payLoad = req.body;
  try {
    if (payLoad.password != payLoad.confirmPassword) {
      return res.status(400).send("password didn't match");
    }
    if (!payLoad) {
      return res.status(400).send("fields are empty");
    }
    //bcrypt to secure password
    bcrypt.hash(payLoad.password, 10, async (err, hash) => {
      if (err) {
        res.status(500).send({ err });
      } else {
        console.log({ payLoad }, payLoad.password, { hash });
        payLoad.password = hash;
        const user = new UserModel(payLoad);
        await user.save();
      }
    });
    res.status(200).send("User registerd");
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

exports.loginUser = async (req, res) => {
  const payLoad = req.body;
  try {
    const user = await UserModel.findOne({email:payLoad.email});
    if (user) {
      //bcrypt to decrypt secure password
      bcrypt.compare(payLoad.password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(payLoad, "jsonwebtoken", { expiresIn: 120 });
          logger.info(`${user.name} who's role is ${user.role} logged in`);
          res.status(200).send({ msg: "Logged in", token, user });
        } else {
          res.status(404).send({ msg: "wrong credentials" });
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
        const data = `Once upon a time, in a cozy corner of a bustling farmhouse, lived a tiny mouse named Milo. Milo was the smallest mouse in his family, with soft brown fur and curious, sparkling eyes. Though he was small, Milo had a big heart and an even bigger dream—to venture beyond the farm and see the mysterious meadow beyond the tall fence. 

One chilly autumn evening, while his brothers and sisters huddled inside their warm nest, Milo decided it was time to be brave. He tiptoed out, heart pounding with excitement, and scurried to the edge of the farmyard, where the looming fence stood tall and intimidating. Just as he was about to squeeze through a gap in the fence, a loud *caw!* echoed through the air—a great black crow perched on a post above him, its sharp eyes glinting in the moonlight.

“Going somewhere, little one?” the crow sneered.

Milo trembled but steadied himself. “Yes, Mr. Crow,” he squeaked. “I’m going to see the meadow. I’ve heard it’s beautiful, and I want to find the best seeds to bring back for my family.”

The crow tilted his head, intrigued by Milo’s courage. “It’s dangerous out there. But perhaps... if you’re brave enough to face me, you’ll be safe in the meadow.” With a flap of his wings, the crow swooped down, challenging Milo.

Milo’s tiny heart raced, but he didn’t back down. He stood his ground, staring up at the huge bird. And then, just as the crow was inches away, Milo darted forward, slipping between the crow’s feet and racing into the meadow.

The crow cawed in surprise, watching the determined little mouse disappear among the tall grasses.

In the meadow, Milo found more than he’d ever dreamed of—soft patches of clover, sweet-smelling wildflowers, and seeds as big as his paws. But the best part? Milo discovered that bravery wasn’t about being fearless; it was about facing his fears for the ones he loved.

When he returned to his family with his treasures, Milo was greeted with cheers. From then on, he was known not just as the little mouse, but as Milo the Brave, the mouse who dared to see the world beyond the fence. And every night after that, Milo would tell his siblings stories of his adventures, inspiring them to be brave too.`;
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
  console.log(req.params);
  try {
    const user = await UserModel.findOneAndDelete({ _id });
    console.log(user);
    res.status(200).send({ msg: "user deleted" });
  } catch (error) {}
};
