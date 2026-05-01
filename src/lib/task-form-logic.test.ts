import { describe, it, expect } from "bun:test";
import { validateTaskTitle } from "./task-form-logic";

describe("validateTaskTitle", () => {
  it("returns an error for an empty title", () => {
    const result = validateTaskTitle("");
    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Title is required");
    }
  });

  it("returns the validated title for valid input", () => {
    expect(validateTaskTitle("Buy milk")).toEqual({ title: "Buy milk" });
  });

  it("returns an error for a title over 120 characters", () => {
    const result = validateTaskTitle("x".repeat(121));
    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Title must be 120 characters or fewer");
    }
  });

  it("accepts a title of exactly 120 characters", () => {
    const result = validateTaskTitle("a".repeat(120));
    expect("title" in result).toBe(true);
  });

  it("accepts a title of exactly 1 character", () => {
    const result = validateTaskTitle("a");
    expect(result).toEqual({ title: "a" });
  });
});
