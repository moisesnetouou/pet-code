"use client";

import { cn } from "@/lib/utils";
import { StatusBadge, TypeBadge } from "./badge";

interface EntityCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageFallback?: string;
  type?: string;
  typeLabel?: string;
  status?: "ativo" | "inativo" | "agendado" | "confirmado" | "cancelado";
  info?: { label: string; value: string }[];
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function EntityCard({
  title,
  subtitle,
  description,
  image,
  imageFallback,
  type,
  typeLabel,
  status,
  info,
  onClick,
  className,
  children,
}: EntityCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-200 overflow-hidden",
        "hover:border-teal-300 transition-colors cursor-pointer",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {/* Image */}
      {image && (
        <div className="relative h-40 bg-slate-100">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          {type && typeLabel && (
            <div className="absolute top-2 right-2">
              <TypeBadge type={type} label={typeLabel} />
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            {!image && !imageFallback && (
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <span className="text-lg">🐾</span>
              </div>
            )}
            {imageFallback && (
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <span className="text-lg">{imageFallback}</span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
              {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
            </div>
          </div>
          {status && <StatusBadge status={status} />}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Info */}
        {info && info.length > 0 && (
          <div className="flex flex-wrap gap-4 text-sm">
            {info.map((item, index) => (
              <div key={index}>
                <span className="text-slate-500">{item.label}: </span>
                <span className="text-slate-700 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Children (for custom content) */}
        {children}
      </div>
    </div>
  );
}
