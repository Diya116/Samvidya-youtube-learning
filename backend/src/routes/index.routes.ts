import express from "express";
import courseRoute from "./course.routes"
import lessonRoute from "./lesson.routes"
const router = express.Router(); 
router.use("/course", courseRoute);
router.use("/lesson", lessonRoute);
export default router;