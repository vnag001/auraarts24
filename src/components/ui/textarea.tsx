import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full border border-border bg-secondary px-4 py-3 text-sm text-primary placeholder:text-muted",
        "focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors min-h-[120px]",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
export { Textarea };
