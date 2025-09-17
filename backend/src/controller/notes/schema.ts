import { z } from "zod";
export const noteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string(),
  lessonId:z.string().optional()
});
// Infer the TypeScript type from the schema
export type noteType = z.infer<typeof noteSchema>;
