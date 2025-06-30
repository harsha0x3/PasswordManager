import express from "express";
const router = express.Router();
import {
  getAllPasswords,
  deleted,
  updatePassword,
  createPassword,
} from "../controllers/passwordController.js";
import protectRoute from "../middleware/authMiddleware.js";

router.route("/generate").post(protectRoute, createPassword);
router.route("/").post(createPassword);
router.route("/mypasswords").get(protectRoute, getAllPasswords);
router.route("/del").delete(deleted);
router.route("/:id").patch(updatePassword);

export default router;
