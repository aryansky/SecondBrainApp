import { z } from "zod";

export const userZodSchema = z.object({
  username: z.string().min(4).max(32),
  password: z.string().min(4).max(32),
});

export const contentZodSchema = z.object({
  link: z.string(),
  type: z.enum(["video", "image", "document", "tweet", "link"]),
  title: z.string(),
  tags: z.array(z.string()).optional(),
});

export const contentDeletionSchema = z.object({
  contentId: z.string(),
});
