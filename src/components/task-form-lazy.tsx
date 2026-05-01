import dynamic from "next/dynamic";

export const TaskFormLazy = dynamic(
  () => import("@/components/task-form").then((m) => m.TaskForm),
  {
    ssr: false,
    loading: () => <p className="text-sm text-muted-foreground">Loading…</p>,
  }
);
