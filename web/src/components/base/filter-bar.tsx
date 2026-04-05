"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Select } from "./select";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: {
    label?: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  sortBy?: {
    label?: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  };
  actions?: React.ReactNode;
  totalResults: number;
  resultLabel?: string;
  className?: string;
}

export function FilterBar({
  searchPlaceholder = "Buscar...",
  searchValue,
  onSearchChange,
  filters,
  sortBy,
  actions,
  totalResults,
  resultLabel = "resultado",
  className,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 mb-6 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm",
        className,
      )}
    >
      {/* Search + Toggle Button */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          />
        </div>

        {/* Toggle Filters Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "p-2.5 rounded-xl border transition-all",
            showFilters
              ? "bg-teal-50 border-teal-200 text-teal-600"
              : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300",
          )}
          aria-label="Filtrar"
        >
          <SlidersHorizontal
            size={18}
            className="transition-transform duration-200"
            style={{ transform: showFilters ? "rotate(180deg)" : "none" }}
          />
        </button>

        {/* Results Count */}
        <span className="ml-auto min-w-fit text-sm text-slate-500 font-medium">
          {totalResults} {totalResults === 1 ? resultLabel : `${resultLabel}s`}
        </span>
      </div>

      {/* Filters Accordion */}
      <AnimatePresence mode="wait">
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center gap-3"
          >
            {/* Filters */}
            {filters?.map((filter, index) => (
              <Select
                key={index}
                options={filter.options}
                value={filter.value}
                onChange={filter.onChange}
                placeholder={filter.label ? `Selecione ${filter.label.toLowerCase()}` : "Selecione..."}
              />
            ))}

            {/* Sort By */}
            {sortBy && (
              <Select
                options={sortBy.options}
                value={sortBy.value}
                onChange={sortBy.onChange}
                placeholder="Ordenar por..."
              />
            )}

            {/* Actions */}
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
