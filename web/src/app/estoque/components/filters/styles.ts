import { tv } from "tailwind-variants";

export const filtersStyles = tv({
  slots: {
    container: "flex items-center justify-between mb-6",
    searchBox: "relative flex-1 max-w-md",
    searchIcon: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400",
    searchInput:
      "w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
    toggleGroup: "flex items-center gap-2",
    toggleButton:
      "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
  },
});
