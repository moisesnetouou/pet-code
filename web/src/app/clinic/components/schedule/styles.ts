import { tv } from "tailwind-variants";

export const scheduleStyles = tv({
  slots: {
    container: "bg-white rounded-2xl border border-slate-200 shadow-sm p-6",
    header: "flex items-center justify-between mb-6",
    title: "text-lg font-bold text-slate-800 flex items-center gap-2",
    titleIcon: "w-5 h-5 text-teal-600",
    editButton:
      "text-slate-500 hover:text-teal-600 hover:bg-teal-50 p-2 rounded-lg transition-colors",
    grid: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3",
    dayCard: "bg-slate-50 rounded-xl p-4 text-center border border-slate-200",
    dayLabel: "text-xs font-medium text-slate-600 uppercase mb-1",
    dayTime: "text-sm font-semibold text-slate-800",
    dayClosed: "text-xs text-slate-500 italic",
  },
});
