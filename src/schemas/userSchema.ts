import { z } from "zod";

export const LoginUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

export const CreateUserSchema = z.object({
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
  username: z.string().min(6).trim(),
  email: z.string().email().trim(),
  password: z.string().min(8)
});
