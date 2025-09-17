import express from "express";
import { updateUser } from "../controller/user/index";
const router = express.Router();

router.put("/user",updateUser);

export default router;