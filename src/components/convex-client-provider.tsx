"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl && process.env.NODE_ENV === "development") {
  console.warn(
    "[ConvexClientProvider] NEXT_PUBLIC_CONVEX_URL is not set. " +
      "Run `bunx convex dev` to provision a backend and add the URL to .env.local. " +
      "Convex hooks will throw at runtime until this is configured."
  );
}

let convex: ConvexReactClient | null = null;
if (convexUrl) {
  try {
    convex = new ConvexReactClient(convexUrl);
  } catch (err) {
    console.error(
      `[ConvexClientProvider] Failed to initialize ConvexReactClient with URL "${convexUrl}":`,
      err
    );
  }
}

function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) return <>{children}</>;
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

export { ConvexClientProvider };
