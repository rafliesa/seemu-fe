import { z } from "zod"

export const loginFormSchema = z.object({
  username: z.string().min(8).max(255),
  password: z.string().min(8).max(255),
})
