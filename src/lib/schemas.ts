import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(120, "Title must be 120 characters or fewer"),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
