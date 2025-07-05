import express from "express";
const router = express.Router();

import {
  authUser,
  deleteUsers,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";

router.route("/").post(registerUser);
router.route("/auth").post(authUser);
router.route("/logout").post(logoutUser);
router.route("/del").delete(deleteUsers);
export default router;
