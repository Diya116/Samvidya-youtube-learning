import { Request,Response,RequestHandler } from "express";
import prisma from "../../lib/db";
import { lessonSchema } from "./schema";
export const getLesson: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const lesson = await prisma.lesson.findFirst({
      where: { id },
    });

    if (!lesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    res.status(200).json(lesson);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//get all lesson by courses
export const getAllLessonsByCourse:RequestHandler=async(req:Request,res:Response)=>{
  try{
    const {courseId}=req.params;
 const lessons=await prisma.lesson.findMany({
 where:{
    courseId
 }
 });
 res.status(200).json(lessons)
  }
catch(error)
{
console.error("Error fetching lessons:",error);
res.status(500).json({
  error:"Internal Server Error"
})
}

}
export const postLesson: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
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

    const validateData = lessonSchema.safeParse(req.body);
    if (!validateData.success) {
      res.status(400).json({ error: validateData.error.errors });
      return;
    }

    const { title, description,videoId,duration,order,courseId,thumbnail,status } = validateData.data;

    const lesson = await prisma.lesson.create({
      data: {
        title,
        description,
        videoId,
        order,
        duration,
        courseId,
        thumbnail,
        status
      },
    });

    res.status(201).json({
      message: "Lesson Created Successfully",
      lesson,
    });
  } catch (error) {
    console.error("Error while creating lesson:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateLesson: RequestHandler = async (req: Request, res: Response): Promise<void> => {
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
    const existingLesson = await prisma.lesson.findFirst({
      where: { id },
    });

    if (!existingLesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    const validateData = lessonSchema.safeParse(req.body);
    if (!validateData.success) {
      res.status(400).json({ error: validateData.error.errors });
      return;
    }

    const { title, description, videoId,
        duration } = validateData.data;

    const updatedLesson = await prisma.lesson.update({
      where: { id },
      data: {
        title,
        description,
        videoId,
        duration
      },
    });

    res.status(200).json({
      message: "lesson Updated Successfully",
      course: updatedLesson,
    });
  } catch (error) {
    console.error("Error while updating lesson:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteLesson: RequestHandler = async (req: Request, res: Response): Promise<void> => {
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
    const existingLesson = await prisma.lesson.findFirst({
      where: { id },
    });

    if (!existingLesson) {
      res.status(404).json({ error: "lesson not found" });
      return;
    }

    await prisma.lesson.delete({
      where: { id },
    });

    res.status(200).json({
      message: "lesson deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


