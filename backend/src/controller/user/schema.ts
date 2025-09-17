import { z } from "zod";
export const userSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
});
export type noteType = z.infer<typeof userSchema>;