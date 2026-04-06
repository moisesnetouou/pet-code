import { tv } from "tailwind-variants";

export const preferencesStyles = tv({
  slots: {
    container: "bg-white rounded-2xl border border-slate-200 shadow-sm p-6",
    header: "flex items-center justify-between mb-6",
    title: "text-lg font-bold text-slate-800 flex items-center gap-2",
    titleIcon: "w-5 h-5 text-teal-600",
    saveButton:
      "bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors",
    section: "mb-6 last:mb-0",
    sectionTitle: "text-base font-semibold text-slate-800 mb-4",
    grid: "grid grid-cols-1 sm:grid-cols-2 gap-4",
    card: "bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3",
    cardLabel: "text-base font-semibold text-slate-800",
    cardValue: "text-sm text-slate-500",
  },
});
