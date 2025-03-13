import { Router } from "express";
import { sendMessage } from "../controllers/message.controller";

const router = Router();
router.route("/send").post(sendMessage);

export default router;
