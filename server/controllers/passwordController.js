import Password from "../models/paswords.js";
import generatePassword from "../utils/generatePassword.js";
import asyncHandler from "express-async-handler";
import Users from "../models/Users.js";
import AuthError from "../errors/authError.js";
import { v4 as uuidv4 } from "uuid";
/*
Routes
route("/del").delete(deleted);
route("/:id").patch(update); */

const getAllPasswords = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new AuthError("Ah! Not Authorized");
  }

  const passwords = await Password.find({ userId: req.user._id });
  res.status(200).json({ passwords, nbHits: passwords.length });
});

//POST@route - '/' && '/generate'
const createPassword = asyncHandler(async (req, res) => {
  const {
    account,
    length,
    includeUpperCase,
    includeLowerCase = true,
    includeNums,
    includeSpecialChars,
    password,
    save,
  } = req.body;
  let generatedPassword;
  let passwordToSet;
  let userName;
  let loggedUser;
  let message;

  if (!password) {
    passwordToSet = generatePassword(
      length,
      includeUpperCase,
      includeLowerCase,
      includeNums,
      includeSpecialChars
    );
  } else {
    passwordToSet = password;
  }

  if (req.user) {
    loggedUser = await Users.findById(req.user._id);
    userName = loggedUser.name;
    if (save) {
      generatedPassword = await Password.create({
        account: account,
        password: passwordToSet,
        userId: req.user._id,
      });
      message = `Password Generated and Saved`;
    } else {
      generatedPassword = {
        password: passwordToSet,
        _id: uuidv4(),
      };
    }
  } else {
    userName = "not Logged";
    generatedPassword = {
      password: passwordToSet,
      _id: uuidv4(),
    };
    message = `Password Generated`;
  }

  res.status(200).json({ generatedPassword, msg: message });
});

const updatePassword = asyncHandler(async (req, res) => {
  const { id: passwordID } = req.params;
  const data = await Password.findOneAndUpdate({ _id: passwordID }, req.body, {
    new: true,
    runValidators: true,
  });
  console.log("INside");
  if (!data) {
    console.log("No data");
  }
  res.status(200).json({ data });
});

const deleted = async (req, res) => {
  try {
    await Password.deleteMany();
    res.send("deleted");
  } catch (error) {}
};
export { getAllPasswords, deleted, updatePassword, createPassword };
