import { describe, it, expect } from "bun:test";
import { taskFormSchema } from "./schemas";

describe("taskFormSchema", () => {
  it("rejects an empty title", () => {
    expect(taskFormSchema.safeParse({ title: "" }).success).toBe(false);
  });

  it("accepts a title of exactly 1 character", () => {
    expect(taskFormSchema.safeParse({ title: "a" }).success).toBe(true);
  });

  it("accepts a title of exactly 120 characters", () => {
    expect(taskFormSchema.safeParse({ title: "a".repeat(120) }).success).toBe(true);
  });

  it("rejects a title of 121 characters", () => {
    expect(taskFormSchema.safeParse({ title: "a".repeat(121) }).success).toBe(false);
  });

  it("returns 'Title is required' for an empty title", () => {
    const result = taskFormSchema.safeParse({ title: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Title is required");
    }
  });

  it("returns 'Title must be 120 characters or fewer' for an over-length title", () => {
    const result = taskFormSchema.safeParse({ title: "a".repeat(121) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Title must be 120 characters or fewer");
    }
  });
});
