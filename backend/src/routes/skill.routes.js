import { Router } from "express";
import {
  addNewSkill,
  getAllSkill,
  deleteSkill,
} from "../controllers/skill.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
//secure routes
router
  .route("/add")
  .post(verifyJWT, upload.fields([{ name: "svg", maxCount: 1 }]), addNewSkill);
router.route("/getall").get(verifyJWT, getAllSkill);
router.route("/delete/:id").delete(verifyJWT, deleteSkill);

export default router;
