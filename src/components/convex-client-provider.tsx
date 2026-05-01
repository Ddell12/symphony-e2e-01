"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? "";
if (!convexUrl) {
  console.warn(
    "[ConvexClientProvider] NEXT_PUBLIC_CONVEX_URL is not set. " +
      "Run `bunx convex dev` to provision a backend and add the URL to .env.local."
  );
}
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!convex) return null;
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
