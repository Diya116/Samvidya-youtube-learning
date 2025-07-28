import express from "express";
import { authService} from "../services/auth/auth.sevice";
import { authController } from "../controller/auth/index";
const router = express.Router();

router.post("/register",authController.register);
router.post("/login", authController.login);
router.delete("/logout",authController.logout);

// router.get("/user", authService.authenticate, authService.getUser);

export default router;