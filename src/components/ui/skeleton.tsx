import { cn } from "@/lib/utils";

/** Loading placeholder block with a subtle shimmer sweep. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} />;
}
