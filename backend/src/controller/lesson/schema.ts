import { z } from "zod";
export const lessonSchema = z.object({
  courseId:z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  url:z.string(),
  duration:z.string(),
  thumbnail:z.string().url({message:"Invalid thumbnail URL"}).optional(),
  // startDate: z.coerce.date().optional(),
  // endDate: z.coerce.date().optional(),
});
// Infer the TypeScript type from the schema
export type CourseType = z.infer<typeof lessonSchema>;
