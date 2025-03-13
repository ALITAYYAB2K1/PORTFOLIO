import { Router } from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = Router();
router.route("/send").post(sendMessage);
router.route("/getall").get(getAllMessages);

export default router;
