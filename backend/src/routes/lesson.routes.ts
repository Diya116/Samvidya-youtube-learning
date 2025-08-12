// Force type to match exactly what express expects
import { Router } from 'express';
import {
  getLesson,
  postLesson,
  updateLesson,
  deleteLesson
} from '../controller/lesson/index';

const router: Router = Router();

/**
 * @openapi
 * /lesson/{id}:
 *   get:
 *     summary: Get a lesson by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson fetched successfully
 */
router.get('/:id', getLesson);

/**
 * @openapi
 * /lesson:
 *   post:
 *     summary: Create a new lesson
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *           description: Title of the lesson
 * 
 *     responses:
 *       201:
 *         description: Lesson created
 */
router.post('/', postLesson);

router.put('/:id', updateLesson);
router.delete('/:id', deleteLesson);

export default router;
