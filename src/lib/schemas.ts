import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1).max(120),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
