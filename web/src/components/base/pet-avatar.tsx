"use client";

import { cn } from "@/lib/utils";

export type PetAvatarSize = "sm" | "md" | "lg" | "xl";

export interface PetAvatarProps {
  photoUrl?: string;
  emoji?: string;
  type?: string;
  name: string;
  size?: PetAvatarSize;
  className?: string;
}

const defaultEmojis: Record<string, string> = {
  Cachorro: "🐕",
  Gato: "🐱",
  Pássaro: "🦜",
  Peixe: "🐠",
  Coelho: "🐰",
  Jabuti: "🐢",
  Outro: "🐾",
};

const randomEmojis = ["🐾", "🐶", "🐱", "🐰", "🦜", "🐠", "🐢", "🐹"];

function getRandomEmoji(): string {
  return randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
}

function getDefaultEmoji(type: string): string {
  return defaultEmojis[type] || "🐾";
}

function getColorForType(type?: string): string {
  const colors: Record<string, string> = {
    Cachorro: "bg-amber-100",
    Gato: "bg-violet-100",
    Pássaro: "bg-sky-100",
    Peixe: "bg-blue-100",
    Coelho: "bg-rose-100",
    Jabuti: "bg-emerald-100",
    Outro: "bg-slate-100",
  };
  return colors[type || ""] || "bg-slate-100";
}

export function PetAvatar({
  photoUrl,
  emoji,
  type,
  name,
  size = "md",
  className,
}: PetAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-lg",
    lg: "w-14 h-14 text-2xl",
    xl: "w-20 h-20 text-4xl",
  };

  const displayEmoji =
    type === "Outro" ? getRandomEmoji() : emoji || getDefaultEmoji(type || "");
  const backgroundColor = getColorForType(type);

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
        backgroundColor,
        sizeClasses[size],
        className,
      )}
    >
      {displayEmoji}
    </div>
  );
}
