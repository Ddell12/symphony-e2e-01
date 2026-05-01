import { taskFormSchema } from "./schemas";

export function validateTaskTitle(title: string): { error: string } | { title: string } {
  const result = taskFormSchema.safeParse({ title });
  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Invalid input" };
  }
  return { title: result.data.title };
}
