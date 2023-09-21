const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const generateToken = require("../Utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { email } = req.body;

  if (user) {
    user.name = req.body.name || user.name;
  }

  if (user.email !== email) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User Email Already Exists");
    }
    user.email = email;
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    if (user.email !== email) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400);
        throw new Error("Email Already Exists");
      }
      user.email = email;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser.id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };
// {
//     "email":"mehakmattoobye@gmail.com",
//     "password":"766"

// {
//     "email":"komal@gmail.com",
//     "password":"30"

// }
// use for testing -- encrypted
// }
