const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  if (!authorization)
    return res.status(401).json({ success: false, msg: "Unauthorized!" });
  const token = authorization.split(" ")[1];
  jwt.verify(token, "USERSECRET", (err, decoded) => {
    if (err)
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    req.userID = decoded.userID;
    next();
  });
};

module.exports = { authenticate };
