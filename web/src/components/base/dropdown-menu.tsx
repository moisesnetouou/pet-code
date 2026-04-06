"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

interface DropdownMenuContentProps {
  className?: string;
  children: ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom";
  sideOffset?: number;
}

const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ className, children, align = "center", side = "bottom", sideOffset = 4 }, ref) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 min-w-[160px] rounded-lg bg-white p-1 text-slate-700 shadow-lg border border-slate-200 outline-none",
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className,
        )}
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});

DropdownMenuContent.displayName = "DropdownMenuContent";

interface DropdownMenuItemProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  onSelect?: () => void;
}

const DropdownMenuItem = forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(({ className, children, onSelect, onClick }, ref) => {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      onClick={onClick}
      onSelect={onSelect}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition-colors",
        "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
        "focus:bg-slate-100 focus:text-slate-900",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
});

DropdownMenuItem.displayName = "DropdownMenuItem";

interface DropdownMenuSeparatorProps {
  className?: string;
}

const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(({ className }, ref) => {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-slate-200", className)}
    />
  );
});

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

interface DropdownMenuLabelProps {
  className?: string;
  children: ReactNode;
}

const DropdownMenuLabel = forwardRef<
  HTMLDivElement,
  DropdownMenuLabelProps
>(({ className, children }, ref) => {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        "px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide",
        className,
      )}
    >
      {children}
    </DropdownMenuPrimitive.Label>
  );
});

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
};
