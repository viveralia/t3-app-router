import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1),
  isComplete: z.boolean().optional().default(false),
});

export type Todo = z.infer<typeof TodoSchema>;
