"use client";

import { cn } from "@/lib/utils";

export type TutorAvatarSize = "sm" | "md" | "lg" | "xl";

export interface TutorAvatarProps {
  photoUrl?: string;
  name: string;
  size?: TutorAvatarSize;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getColorForName(name: string): string {
  const colors = [
    "bg-emerald-100 text-emerald-700",
    "bg-blue-100 text-blue-700",
    "bg-violet-100 text-violet-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
    "bg-cyan-100 text-cyan-700",
    "bg-orange-100 text-orange-700",
    "bg-teal-100 text-teal-700",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function TutorAvatar({
  photoUrl,
  name,
  size = "md",
  className,
}: TutorAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
    xl: "w-20 h-20 text-2xl",
  };

  if (photoUrl) {
    return (
      <div
        className={cn(
          "rounded-full overflow-hidden flex items-center justify-center bg-slate-100",
          sizeClasses[size],
          className,
        )}
      >
        <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold",
        getColorForName(name),
        sizeClasses[size],
        className,
      )}
    >
      {getInitials(name)}
    </div>
  );
}