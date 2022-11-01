const e = require("express");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");

//////////////////////////////////////////////////////////////

const registeUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400).send("Please enter all the fields");
    // throw new Error("Please enter all the fields");
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400).send("User exit before");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("User creation failed");
  }
});

///////////////////////////////////////////////////////////////////////
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send("Invalid email or password");
  }
});

module.exports = { registeUser, authUser };
