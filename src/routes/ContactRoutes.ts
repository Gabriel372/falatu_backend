import { Router } from "express";
import ContactController from "../controllers/ContactController";

const router = Router();

router.post("/create", ContactController.create);
router.get("/allusercontacts", ContactController.getAllUserContacts);
router.delete("/:id", ContactController.deleteContactById);

export default router;
