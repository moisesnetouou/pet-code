"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends React.ComponentProps<"label"> {
  className?: string;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn("text-sm font-medium text-slate-700", className)}
        {...props}
      />
    );
  },
);

Label.displayName = "Label";

export type { LabelProps };
export { Label };
