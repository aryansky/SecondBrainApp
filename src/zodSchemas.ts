import { z } from "zod";

export const userZodSchema = z.object({
  username: z.string().min(4).max(32),
  password: z.string().min(4).max(32),
});
