import { Router } from "express";
import MessageController from "../controllers/MessageController";

const router = Router();
router.post("/create", MessageController.create);
router.post("/listmessages", MessageController.giveListMessage);

export default router;
