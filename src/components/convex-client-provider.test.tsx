import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import type { ReactNode } from "react";

vi.mock("convex/react", () => ({
  ConvexProvider: ({ children }: { children: ReactNode }) => (
    <div data-testid="convex-provider">{children}</div>
  ),
  // Must use a regular function so vitest allows it as a constructor
  ConvexReactClient: vi.fn(function ConvexReactClient() {}),
}));

describe("ConvexClientProvider", () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
    vi.resetModules();
  });

  it("renders children directly when NEXT_PUBLIC_CONVEX_URL is not set", async () => {
    process.env = { ...originalEnv, NEXT_PUBLIC_CONVEX_URL: undefined };
    const { ConvexClientProvider } = await import("./convex-client-provider");

    render(
      <ConvexClientProvider>
        <span>child</span>
      </ConvexClientProvider>
    );

    expect(screen.getByText("child")).toBeInTheDocument();
    expect(screen.queryByTestId("convex-provider")).toBeNull();
  });

  it("wraps children in ConvexProvider when NEXT_PUBLIC_CONVEX_URL is set", async () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_CONVEX_URL: "https://example.convex.cloud",
    };
    const { ConvexClientProvider } = await import("./convex-client-provider");

    render(
      <ConvexClientProvider>
        <span>child</span>
      </ConvexClientProvider>
    );

    expect(screen.getByTestId("convex-provider")).toBeInTheDocument();
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("renders children directly when NEXT_PUBLIC_CONVEX_URL is an empty string", async () => {
    process.env = { ...originalEnv, NEXT_PUBLIC_CONVEX_URL: "" };
    const { ConvexClientProvider } = await import("./convex-client-provider");

    render(
      <ConvexClientProvider>
        <span>child</span>
      </ConvexClientProvider>
    );

    expect(screen.getByText("child")).toBeInTheDocument();
    expect(screen.queryByTestId("convex-provider")).toBeNull();
  });

  it("renders children directly when ConvexReactClient constructor throws", async () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_CONVEX_URL: "not-a-valid-url",
    };

    // Set up the constructor to throw before importing the module under test
    const convexMod = await import("convex/react");
    vi.mocked(convexMod.ConvexReactClient).mockImplementationOnce(function () {
      throw new Error("Invalid URL");
    });

    const { ConvexClientProvider } = await import("./convex-client-provider");

    render(
      <ConvexClientProvider>
        <span>child</span>
      </ConvexClientProvider>
    );

    expect(screen.getByText("child")).toBeInTheDocument();
    expect(screen.queryByTestId("convex-provider")).toBeNull();
  });
});
