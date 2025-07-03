import Users from "../models/Users.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/genereateToken.js";
import BadRequest from "../errors/badRequestError.js";
import AuthError from "../errors/authError.js";

//@route /auth request - POST
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("email or password can't be empty");
  }

  const user = await Users.findOne({ email });
  if (!user) {
    throw new AuthError("No user present");
  }
  if (!(await user.validatePassword(password))) {
    console.log(password);

    throw new AuthError("Invalid Credentials");
  }
  generateToken(res, user._id);
  res.status(200).json({
    user: { name: user.name, email: user.email },
    msg: `Logged in as ${user.name}`,
  });
});

// @route / request - POST
const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userExists = await Users.findOne({ email });
  if (userExists) {
    throw new BadRequest("User Exists");
  }

  const newUser = await Users.create(req.body);

  if (newUser) {
    generateToken(res, newUser._id);
  }
  res.status(200).json({ newUser });
});

// @route / request - POST
const logoutUser = asyncHandler(async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "strict",
    expires: new Date(0),
  });

  res.status(200).json({ msg: "User logged out" });
});

// @route / request - GET
const showAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await Users.find({});
  res.status(200).json({ allUsers });
});

const deleteUsers = asyncHandler(async (req, res) => {
  await Users.deleteMany();
  res.send("deleted Everything");
});

export { registerUser, showAllUsers, authUser, deleteUsers, logoutUser };
