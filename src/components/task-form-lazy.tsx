"use client";

import dynamic from "next/dynamic";

export const TaskFormLazy = dynamic(
  () => import("@/components/task-form").then((m) => m.TaskForm),
  { ssr: false }
);
