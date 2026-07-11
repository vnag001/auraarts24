import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

/** Standard empty state — used for empty cart, wishlist, search results, admin lists, etc. */
export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-24 px-6", className)}>
      <Icon className="h-12 w-12 text-accent mb-6" strokeWidth={1.25} />
      <h3 className="font-display text-2xl text-primary mb-2">{title}</h3>
      <p className="text-muted max-w-sm mb-8">{description}</p>
      {action}
    </div>
  );
}
