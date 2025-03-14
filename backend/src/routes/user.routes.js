import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
//secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/me").get(verifyJWT, getUser);
router.route("/update/me").put(
  verifyJWT,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateUserProfile
);

export default router;
