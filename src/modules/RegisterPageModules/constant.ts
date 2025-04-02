import { z } from "zod"

export const registrationFormSchema = z
  .object({
    email: z.string().email().min(5).max(255),
    username: z.string().min(8).max(255),
    password1: z.string().min(8).max(255),
    password2: z.string().min(8).max(255),
    firstname: z.string().min(2).max(255),
    lastname: z.string().min(2).max(255),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords don't match",
    path: ["password2"], 
  })
