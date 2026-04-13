"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { buttonStyles } from "./styles";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      fullWidth,
      type = "button",
      disabled,
      ...props
    },
    ref,
  ) => {
    const s = buttonStyles({ variant, size });

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(s.base(), fullWidth && "w-full", className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export type { ButtonProps, ButtonSize, ButtonVariant };
export { Button };
