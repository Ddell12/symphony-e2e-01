"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { taskFormSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TaskForm() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const createTask = useMutation(api.tasks.create);
  const tasks = useQuery(api.tasks.list);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = taskFormSchema.safeParse({ title });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setError(null);
    setIsPending(true);
    try {
      await createTask({ title: result.data.title });
      setTitle("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add task. Please try again."
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
            maxLength={120}
            aria-invalid={error ? true : undefined}
          />
          <Button type="submit" disabled={isPending}>Add Task</Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </form>
      {tasks && tasks.length > 0 && (
        <ul className="flex flex-col gap-1">
          {tasks.map((task) => (
            <li key={task._id} className="text-sm text-foreground">
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
