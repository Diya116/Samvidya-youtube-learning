import { Request, Response, RequestHandler,NextFunction } from "express";
import prisma from "../../lib/db"; 
import { courseSchema } from "./schema";
export const getCourse: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findFirst({
      where: { id },
      include:{
        lessons:true,
        user:true
      }
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



export const getAllCourses:RequestHandler=async(req:Request,res:Response)=>{
  try{
 const courses=await prisma.course.findMany({
include:{
  lessons:true,
  user:true
}
 });
 res.status(200).json(courses)
  }
catch(error)
{
console.error("Error fetching courses:",error);
res.status(500).json({
  error:"Internal Server Error"
})
}

}
interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    name?: string;
    email?: string;
    [key: string]: any;
  };
}
export const postCourse = async (req: Request, res: Response, next: NextFunction): Promise<void>  => {
  try {
    const authReq= req as AuthenticatedRequest;
    const userId = authReq.user?.id // Assuming user ID is set by auth middleware

    if (!userId) {
      res.status(401).json({ error: "Unauthorised access: user Id not found" });
      return;
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      res.status(400).json({ error: "User does not exist" });
      return;
    }

    const validateData = courseSchema.safeParse(req.body);
    if (!validateData.success) {
      res.status(400).json({ error: validateData.error.errors });
      return;
    }

    const { title, description, coverImg } = validateData.data;
    const {lessons} = req.body;
    const course = await prisma.course.create({
      data: {
        title,
        description,
        coverImg,
        userId,
        lessons: {
          create: lessons.map((lesson: any) => ({
            title: lesson.title,
            description: lesson.description,
            url: lesson.videoUrl,
            duration: lesson.duration,
          })),
        },
      },
    });

    res.status(201).json({
      message: "Course Created Successfully",
      course,
    });
  } catch (error) {
    console.error("Error while creating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export const updateCourse: RequestHandler = async (req: Request, res: Response): Promise<void> => {
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
        coverImg
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

export const deleteCourse: RequestHandler = async (req: Request, res: Response): Promise<void> => {
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


