
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    indeterminate?: boolean;
    size?: 'sm' | 'md' | 'lg';
  }
>(({ className, indeterminate, size = 'md', ...props }, ref) => {
  const checkboxRef = React.useRef<HTMLButtonElement>(null);
  
  React.useEffect(() => {
    if (checkboxRef.current && indeterminate !== undefined) {
      (checkboxRef.current as any).indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <CheckboxPrimitive.Root
      ref={(node) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        checkboxRef.current = node;
      }}
      className={cn(
        "peer shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        {
          "h-4 w-4": size === 'sm',
          "h-5 w-5": size === 'md',
          "h-6 w-6": size === 'lg'
        },
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check 
          className={cn(
            "text-current", 
            {
              "h-3 w-3": size === 'sm',
              "h-4 w-4": size === 'md',
              "h-5 w-5": size === 'lg'
            }
          )} 
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
