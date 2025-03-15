import { Router } from "express";
import {
  addNewApplication,
  getAllApplication,
  deleteApplication,
} from "../controllers/timeline.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
//secure routes
router.route("/add").post(verifyJWT, addNewApplication);
router.route("/getall").get(verifyJWT, getAllApplication);
router.route("/delete/:id").delete(verifyJWT, deleteApplication);

export default router;
