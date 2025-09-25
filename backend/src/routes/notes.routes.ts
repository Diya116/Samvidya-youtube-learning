import { Router } from "express";
//import { createNote } from "../controller/notes";
import {createNote,getNotesByCourse,getAllNotesOfUser,getSingleNoteById,updateNote} from "../controller/notes"
import { authMiddleware } from "../middleware/auth";
const router:Router=Router();
router.post('/',authMiddleware,createNote);
router.get('/course/:courseId',authMiddleware,getNotesByCourse)
router.get('/',authMiddleware,getAllNotesOfUser);
router.get('/:id',authMiddleware,getSingleNoteById);
router.put('/:id',authMiddleware,updateNote)
export default router;