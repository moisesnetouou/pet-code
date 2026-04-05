import { tv } from "tailwind-variants";

export const calendarHeaderStyles = tv({
  slots: {
    container: "flex items-center justify-between mb-6",
    navButtons: "flex items-center gap-2",
    navButton:
      "p-2 rounded-lg text-slate-500 hover:text-teal-600 hover:bg-teal-50 transition-colors",
    title: "text-xl font-bold text-slate-800",
    viewSelector: "flex items-center gap-1 bg-slate-100 rounded-lg p-1",
    viewButton: "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
  },
});
