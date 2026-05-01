"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex items-center justify-center rounded-xl border p-8 shadow-sm">
        <Button onClick={() => console.log("hello, symphony")}>
          Hello, Symphony
        </Button>
      </div>
    </div>
  )
}
