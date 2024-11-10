const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "jsonwebtoken");
    if (decoded) {
      req.userID=decoded.userID
      next();
    } else res.status(403).send({ message: "login first" });
  } else res.status(403).send({ message: "login first" });
};
