import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  description: z.string().optional(),
  coverImg: z.string().url({ message: "Invalid cover image URL" }).optional()
});

// Infer the TypeScript type from the schema
export type CourseType = z.infer<typeof courseSchema>;
