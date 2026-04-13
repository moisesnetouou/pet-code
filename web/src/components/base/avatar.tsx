"use client";

import { forwardRef, type ReactNode } from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils";

const avatarStyles = tv({
  slots: {
    base: "rounded-full flex items-center justify-center overflow-hidden",
    image: "aspect-square size-full object-cover",
    fallback: "flex items-center justify-center text-sm font-medium",
  },
  variants: {
    size: {
      sm: { base: "w-8 h-8", fallback: "text-xs" },
      default: { base: "w-10 h-10", fallback: "text-sm" },
      lg: { base: "w-12 h-12", fallback: "text-base" },
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
  children?: ReactNode;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, size = "default", className, children }, ref) => {
    const s = avatarStyles({ size });

    return (
      <div ref={ref} className={cn(s.base(), className)}>
        {src ? (
          <img src={src} alt={alt} className={s.image()} />
        ) : (
          <div className={s.fallback()}>{children}</div>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export type { AvatarProps };
export { Avatar };
