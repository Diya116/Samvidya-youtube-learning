// Force type to match exactly what express expects
import {  Router } from "express";
import { getCourse,getAllCourses,postCourse,updateCourse,deleteCourse } from "../controller/course/index";
import { getAllLessonsByCourse } from "../controller/lesson/index";
import { authMiddleware } from "../middleware/auth";
const router: Router = Router();

router.get("/:id",authMiddleware,getCourse);
router.get("/",authMiddleware,getAllCourses);
router.post("/",authMiddleware,postCourse);
router.put("/:id",authMiddleware,updateCourse);
router.delete("/:id",authMiddleware,deleteCourse);
router.get("/:id/lesson",authMiddleware,getAllLessonsByCourse);
export default router;
