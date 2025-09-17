import express from "express";
import courseRoute from "./course.routes"
import lessonRoute from "./lesson.routes"
import authRoute from "./auth.routes"
import youtubeRoute from "./youtube.routes"
import noteRoute from "./notes.routes"
const router = express.Router(); 
router.use("/course", courseRoute);
router.use("/lesson", lessonRoute);
router.use("/auth",authRoute);
router.use("/youtube",youtubeRoute);
router.use('/note',noteRoute);
export default router;