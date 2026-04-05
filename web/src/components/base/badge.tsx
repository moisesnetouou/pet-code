"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "error" | "info" | "default";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  default: "bg-slate-100 text-slate-700",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-sm",
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-full",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

// Status badge helper
type StatusType =
  | "ativo"
  | "inativo"
  | "agendado"
  | "confirmado"
  | "cancelado"
  | "pendente";

const statusConfig: Record<
  StatusType,
  { variant: BadgeVariant; label: string }
> = {
  ativo: { variant: "success", label: "Ativo" },
  inativo: { variant: "error", label: "Inativo" },
  agendado: { variant: "info", label: "Agendado" },
  confirmado: { variant: "success", label: "Confirmado" },
  cancelado: { variant: "error", label: "Cancelado" },
  pendente: { variant: "warning", label: "Pendente" },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} size="sm" className={className}>
      {config.label}
    </Badge>
  );
}

// Type badge helper (for pet types, stock types, etc)
interface TypeBadgeProps {
  type: string;
  label: string;
  className?: string;
}

const typeColors: Record<string, { bg: string; text: string }> = {
  Cachorro: { bg: "bg-amber-100", text: "text-amber-800" },
  Gato: { bg: "bg-violet-100", text: "text-violet-800" },
  Pássaro: { bg: "bg-sky-100", text: "text-sky-800" },
  Peixe: { bg: "bg-blue-100", text: "text-blue-800" },
  Coelho: { bg: "bg-rose-100", text: "text-rose-800" },
  Jabuti: { bg: "bg-emerald-100", text: "text-emerald-800" },
  Outro: { bg: "bg-slate-100", text: "text-slate-700" },
  MEDICAMENTO: { bg: "bg-violet-100", text: "text-violet-800" },
  RACAO: { bg: "bg-amber-100", text: "text-amber-800" },
  BRINQUEDO: { bg: "bg-pink-100", text: "text-pink-800" },
  VACINA: { bg: "bg-emerald-100", text: "text-emerald-800" },
  MATERIAL: { bg: "bg-blue-100", text: "text-blue-800" },
  OUTRO: { bg: "bg-slate-100", text: "text-slate-700" },
};

function TypeBadge({ type, label, className }: TypeBadgeProps) {
  const colors = typeColors[type] || typeColors.Outro;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        colors.bg,
        colors.text,
        className,
      )}
    >
      {label}
    </span>
  );
}

export type { BadgeProps, BadgeSize, BadgeVariant };
export { Badge, StatusBadge, TypeBadge };
