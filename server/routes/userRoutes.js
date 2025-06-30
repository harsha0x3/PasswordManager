import express from "express";
const router = express.Router();

import {
  authUser,
  deleteUsers,
  logoutUser,
  registerUser,
  showAllUsers,
} from "../controllers/userController.js";

router.route("/").post(registerUser).get(showAllUsers);
router.route("/auth").post(authUser);
router.route("/logout").post(logoutUser);
router.route("/del").delete(deleteUsers);
export default router;
