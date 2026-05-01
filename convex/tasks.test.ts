import { convexTest } from "convex-test";
import { describe, it, expect } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

describe("tasks.create", () => {
  it("inserts a task and returns its ID", async () => {
    const t = convexTest(schema, modules);
    const id = await t.mutation(api.tasks.create, { title: "Buy groceries" });
    expect(id).toBeDefined();
    expect(typeof id).toBe("string");
  });

  it("persists title correctly", async () => {
    const t = convexTest(schema, modules);
    await t.mutation(api.tasks.create, { title: "Write tests" });
    const tasks = await t.query(api.tasks.list, {});
    expect(tasks[0].title).toBe("Write tests");
  });

  it("rejects a non-string title", async () => {
    const t = convexTest(schema, modules);
    await expect(
      // @ts-expect-error intentional runtime test
      t.mutation(api.tasks.create, { title: 42 })
    ).rejects.toThrow();
  });

  it("rejects an empty title", async () => {
    const t = convexTest(schema, modules);
    await expect(
      t.mutation(api.tasks.create, { title: "" })
    ).rejects.toThrow("Title cannot be empty.");
  });

  it("rejects a whitespace-only title", async () => {
    const t = convexTest(schema, modules);
    await expect(
      t.mutation(api.tasks.create, { title: "   " })
    ).rejects.toThrow("Title cannot be empty.");
  });
});

describe("tasks.list", () => {
  it("returns an empty array when no tasks exist", async () => {
    const t = convexTest(schema, modules);
    const tasks = await t.query(api.tasks.list, {});
    expect(tasks).toEqual([]);
  });

  it("returns tasks in descending creation order", async () => {
    const t = convexTest(schema, modules);
    await t.mutation(api.tasks.create, { title: "First task" });
    await t.mutation(api.tasks.create, { title: "Second task" });
    const tasks = await t.query(api.tasks.list, {});
    expect(tasks).toHaveLength(2);
    expect(tasks[0].title).toBe("Second task");
    expect(tasks[1].title).toBe("First task");
  });

  it("returns all fields for each task", async () => {
    const t = convexTest(schema, modules);
    await t.mutation(api.tasks.create, { title: "Test task" });
    const tasks = await t.query(api.tasks.list, {});
    expect(tasks[0]).toMatchObject({ title: "Test task" });
    expect(tasks[0]._id).toBeDefined();
    expect(tasks[0]._creationTime).toBeGreaterThan(0);
  });
});
