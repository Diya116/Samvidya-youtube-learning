import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }).max(100, { message: "Title must be less than 100 characters" }),
  description: z.string().max(1000, { message: "Description must be less than 1000 characters" }).optional(),
  coverImg: z.string().url({ message: "Invalid cover image URL" }).optional()
});

// Infer the TypeScript type from the schema
export type CourseType = z.infer<typeof courseSchema>;
