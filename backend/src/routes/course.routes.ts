// Force type to match exactly what express expects
import {  Router } from "express";
import { getCourse,getAllCourses,postCourse,updateCourse,deleteCourse } from "../controller/course/index";
import { getAllLessonsByCourse } from "../controller/lesson/index";
const router: Router = Router();

router.get("/:id",getCourse);
router.get("/",getAllCourses);
router.post("/",postCourse);
router.put("/:id",updateCourse);
router.delete("/:id",deleteCourse);
router.get("/:id/lesson",getAllLessonsByCourse);
export default router;
