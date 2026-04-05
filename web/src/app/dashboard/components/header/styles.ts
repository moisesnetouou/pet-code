import { tv, type VariantProps } from "tailwind-variants";

export const headerStyles = tv({
  slots: {
    container:
      "h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20",
    greetingContainer: "flex items-center gap-4",
    greetingTitle: "text-2xl font-bold text-slate-800",
    greetingDate: "text-sm text-slate-600",
    actionsContainer: "flex items-center gap-3",
    searchContainer: "relative",
    searchIcon:
      "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500",
    searchInput:
      "pl-10 w-80 bg-white border-slate-300 rounded-xl text-slate-700 placeholder:text-slate-400",
    searchButton: "text-slate-600",
    actionButton: "gap-2 rounded-xl",
    notificationButton:
      "relative text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl",
    notificationBadge:
      "absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full",
  },
});

export type HeaderVariants = VariantProps<typeof headerStyles>;
