import { z } from "zod";

export const RegistrationSchema = z.object({
  email: z.string().trim().email({
    message: "Enter a valid email address",
  }),
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(30, {
      message: "Name can’t be longer than 30 characters",
    }),
  password: z
    .string()
    .trim()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(100, {
      message: "Password can’t be longer than 100 characters",
    }),
});

export const LoginSchema = z.object({
  email: z.string().trim().email({
    message: "Enter a valid email address",
  }),
  password: z
    .string()
    .trim()
    .min(8, {
      message: "Password is required (min 8 characters)",
    })
    .max(100, {
      message: "Password can’t be longer than 100 characters",
    }),
});
