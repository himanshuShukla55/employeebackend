const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { generateError } = require("../utils/generateError");

userRouter.post("/signup", async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    await UserModel.create({ ...req.body, password: hash });
    res.status(201).json({ success: true, msg: "successfully singed up!" });
  } catch (error) {
    console.log("error in sign up", error);
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) generateError(404, "User not found!");
    const result = bcrypt.compareSync(password, user.password);
    if (!result) generateError(401, "Invalid Credentials!");
    const token = jwt.sign({ userID: user._id }, "USERSECRET");
    res
      .status(200)
      .json({ success: true, msg: "successfully logged in!", data: token });
  } catch (error) {
    console.error("error in login", error);
    next(error);
  }
});

module.exports = { userRouter };
