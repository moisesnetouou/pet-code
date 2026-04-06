"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollAreaProps {
  className?: string;
  children: ReactNode;
}

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children }, ref) => {
    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn("relative", className)}
      >
        <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit] outline-none">
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

interface ScrollBarProps {
  className?: string;
  orientation?: "vertical" | "horizontal";
}

const ScrollBar = forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ className, orientation = "vertical" }, ref) => {
    return (
      <ScrollAreaPrimitive.Scrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
          "flex touch-none p-px transition-colors select-none",
          orientation === "horizontal"
            ? "h-2.5 flex-col border-t border-t-transparent"
            : "w-2.5 h-full flex-col border-l border-l-transparent",
          className,
        )}
      >
        <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-slate-300 hover:bg-slate-400" />
      </ScrollAreaPrimitive.Scrollbar>
    );
  }
);

ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
