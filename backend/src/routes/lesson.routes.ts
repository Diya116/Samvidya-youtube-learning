// Force type to match exactly what express expects
import {  Router } from "express";
import { getLesson,postLesson,updateLesson,deleteLesson
 } from "../controller/lesson/index";

const router: Router = Router();

router.get("/:id",getLesson);
router.post("/",postLesson);
router.put("/:id",updateLesson);
router.delete("/:id",deleteLesson)
export default router;
