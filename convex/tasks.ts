import { mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("desc").collect();
  },
});

export const create = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    if (args.title.trim().length === 0) {
      throw new ConvexError("Title cannot be empty.");
    }
    return await ctx.db.insert("tasks", {
      title: args.title,
    });
  },
});
