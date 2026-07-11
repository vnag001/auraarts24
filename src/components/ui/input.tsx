import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full border border-border bg-secondary px-4 py-3 text-sm text-primary placeholder:text-muted",
        "focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
export { Input };
