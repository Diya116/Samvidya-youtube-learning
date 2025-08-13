import { Request, Response, RequestHandler, NextFunction } from "express";
import prisma from "../../lib/db";
import { courseSchema } from "./schema";
import {calculateTotalDuration} from "../../utils/calculateTotalDuration"
export const getCourse: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findFirst({
      where: { id },
      include: {
        lessons: true,
        user: true,
      },
    });

    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllCourses: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const authReq = req as AuthenticatedRequest;
  const userId = authReq.user?.id;
  if(!userId)
  {
    res.status(404).json({message:"user not exist"})
  }
  try {
    const courses = await prisma.course.findMany({
         where: {
        userId: userId,
      },
      include: {
        lessons: true,
        user: true,
      }
    });
    const formattedCourses = courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      coverImg: course.coverImg,
      userId: course.userId,
      activeLessonId: course.activeLessonId,
      duration: course.totalDuration,
      numberOfLesson: course.lessons.length,
      completedLesson: course.lessons.filter((l) => l.status === "COMPLETED")
        .length,
    }));
    res.status(200).json(formattedCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    name?: string;
    email?: string;
    [key: string]: any;
  };
}
export const postCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.id; // Assuming user ID is set by auth middleware

    if (!userId) {
      res.status(401).json({ error: "Unauthorised access: user Id not found" });
      return;
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      res.status(400).json({ error: "User does not exist" });
      return;
    }
    console.log(req.body);

    const validateData = courseSchema.safeParse(req.body);
    if (!validateData.success) {
      res.status(400).json({ error: validateData.error.errors });
      return;
    }
    // console.log("hello")
    // console.log(req.body)

    const { title, description, coverImg } = validateData.data;
    const { lessons } = req.body;
    const totalDuration = calculateTotalDuration(lessons);
    const course = await prisma.course.create({
      data: {
        title,
        description,
        coverImg,
        userId,
        totalDuration,
        lessons: {
          create: lessons.map((lesson: any) => ({
            title: lesson.title,
            description: lesson.description,
            videoId: lesson.videoId,
            thumbnail: lesson.thumbnail,
            duration: lesson.duration,
            order: lesson.order,
            status: "NA",
          })),
        },
      },
      include: { lessons: true },
    });
    const activeLessonId = course.lessons.filter((i: any) => i.order === 1)[0].id;
   const updatedCourse = await prisma.course.update({
      where: { id: course.id },
      data: { activeLessonId: activeLessonId },
    });
    res.status(201).json({
      message: "Course Created Successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error("Error while creating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export const updateCourse: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = 1;

    if (!userId) {
      res.status(401).json({ error: "Unauthorised access: user Id not found" });
      return;
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      res.status(400).json({ error: "User does not exist" });
      return;
    }

    // Check if course exists
    const existingCourse = await prisma.course.findFirst({
      where: { id },
    });

    if (!existingCourse) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    const validateData = courseSchema.safeParse(req.body);
    if (!validateData.success) {
      res.status(400).json({ error: validateData.error.errors });
      return;
    }

    const { title, description, coverImg } = validateData.data;

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
        coverImg,
      },
    });

    res.status(200).json({
      message: "Course Updated Successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error while updating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCourse: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = 1;

    if (!userId) {
      res.status(401).json({ error: "Unauthorised access: user Id not found" });
      return;
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      res.status(400).json({ error: "User does not exist" });
      return;
    }

    // Check if course exists
    const existingCourse = await prisma.course.findFirst({
      where: { id },
    });

    if (!existingCourse) {
      res.status(404).json({ error: "Course not found" });
    }

    await prisma.course.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const courseProgress = async (req: Request, res: Response) => {
  try {
    console.log("i am called-backend");
    console.log(req.body);
    const { id, activeLessonId } = req.body;
    console.log("id", id);
    console.log("activeLessonId", activeLessonId);
    if (!id || !activeLessonId) {
      res.status(400).json({ error: "course id or activelesson id not there" });
    }
    const existingCourse = await prisma.course.findFirst({
      where: { id },
    });

    if (!existingCourse) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    await prisma.course.update({
      where: { id },
      data: { activeLessonId },
    });
    console.log("updated");
    res.status(201).json({
      message: "Course activelessonid updated succesfully",
    });
  } catch (error) {
    console.error("Error while deleting course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

type ReorderLesson = { id: string; order: number };
export const reorderLessons = async (req: Request, res: Response) => {
  try {
    const lessons = req.body;
    const { courseId } = req.params;
    if (!courseId) {
      res.status(400).json({ error: "Course ID is required" });
      return;
    }
    const existingCourse = await prisma.course.findFirst({
      where: { id: courseId },
    });

    if (!existingCourse) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        lessons: {
          updateMany: await Promise.all(
            lessons.data.map((lesson: ReorderLesson) => ({
              where: { id: lesson.id },
              data: { order: lesson.order },
            }))
          ),
        },
      },
    });
    res.status(200).json({ message: "Lessons reordered successfully" });
  } catch (error) {
    console.error("Error while reordering lessons:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateStatusOfLesson = async (req: Request, res: Response) => {
  try {
    const { lessonId, status } = req.body;
    const { courseId } = req.params;
    if (!courseId || !lessonId || !status) {
      res
        .status(400)
        .json({ error: "Course ID, Lesson ID, and status are required" });
      return;
    }
    const existingCourse = await prisma.course.findFirst({
      where: { id: courseId },
    });

    if (!existingCourse) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    await prisma.course.update({
      where: { id: courseId },
      data: {
        lessons: {
          update: {
            where: { id: lessonId },
            data: { status: status },
          },
        },
      },
    });
    res.status(200).json({ message: "Lesson status updated successfully" });
  } catch (error) {
    console.error("Error while updating lesson status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
