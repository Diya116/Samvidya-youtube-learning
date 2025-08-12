import { z } from "zod";
export const lessonSchema = z.object({
  courseId:z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  videoId:z.string(),
  duration:z.string(),
  thumbnail:z.string().url({message:"Invalid thumbnail URL"}).optional(),
  order:z.number(),
  status:z.string()
});
// Infer the TypeScript type from the schema
export type CourseType = z.infer<typeof lessonSchema>;
