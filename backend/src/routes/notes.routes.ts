import { Router } from "express";
//import { createNote } from "../controller/notes";
import {createNote,getNotesByLesson} from "../controller/notes"
import { authMiddleware } from "../middleware/auth";
const router:Router=Router();
router.post('/',authMiddleware,createNote);
router.get('/lesson/:id',authMiddleware,getNotesByLesson)
export default router;