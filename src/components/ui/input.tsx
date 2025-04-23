
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = 'md', fullWidth = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-blue-600",
          {
            "h-9 px-2 text-sm": size === 'sm',
            "h-10 px-3 py-2 text-base": size === 'md',
            "h-12 px-4 py-3 text-lg": size === 'lg',
            "w-full": fullWidth,
            "w-auto": !fullWidth
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
