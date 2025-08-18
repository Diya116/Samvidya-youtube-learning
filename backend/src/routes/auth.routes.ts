import express from "express";
import { authController } from "../controller/auth/index";
const router = express.Router();

router.post("/register",authController.register);
router.post("/login", authController.login);
router.delete("/logout",authController.logout);
router.post("/refresh-token", authController.refreshToken);
// router.get("/user", authService.authenticate, authService.getUser);

export default router;