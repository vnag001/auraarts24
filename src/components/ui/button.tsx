import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm tracking-wide uppercase font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-secondary hover:bg-accent hover:text-primary",
        outline: "border border-primary text-primary hover:bg-primary hover:text-secondary",
        gold: "bg-accent text-primary shadow-gold hover:bg-accent-dark hover:text-secondary",
        ghost: "text-primary hover:bg-primary/5",
        link: "text-accent underline-offset-4 hover:underline normal-case tracking-normal",
      },
      size: {
        sm: "px-5 py-2 text-xs",
        md: "px-8 py-3.5",
        lg: "px-10 py-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
