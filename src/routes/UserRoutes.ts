import UserController from "../controllers/UserController";
import * as verifyToken from "../helpers/verify-token";
import { Router } from "express";

const router = Router();
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/checkuserbytoken", UserController.checkUserByToken);
// router.delete("/:id", UserController.delete);
// router.patch("/edit/:id", verifyToken, UserController.editUser);

export default router

// module.exports = router;
