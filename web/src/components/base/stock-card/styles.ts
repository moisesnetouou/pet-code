import { tv } from "tailwind-variants";

export const stockCardStyles = tv({
  slots: {
    container:
      "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-teal-300 hover:shadow-md transition-all cursor-pointer",
    imageContainer: "relative h-40 bg-slate-50",
    image: "w-full h-full object-cover",
    typeBadge:
      "absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium",
    content: "p-4",
    header: "flex items-start justify-between mb-2",
    name: "text-lg font-semibold text-slate-800",
    description: "text-sm text-slate-600 mb-3 line-clamp-2",
    footer: "flex items-center justify-between pt-3 border-t border-slate-100",
    quantity: "text-lg font-bold text-slate-800",
    unit: "text-sm text-slate-500",
    minLabel: "text-xs text-slate-500",
  },
});

export type StockCardVariants = ReturnType<typeof stockCardStyles>;
