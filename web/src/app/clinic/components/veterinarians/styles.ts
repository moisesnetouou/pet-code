import { tv } from "tailwind-variants";

export const veterinariansStyles = tv({
  slots: {
    container: "bg-white rounded-2xl border border-slate-200 shadow-sm p-6",
    header: "flex items-center justify-between mb-6",
    title: "text-lg font-bold text-slate-800 flex items-center gap-2",
    titleIcon: "w-5 h-5 text-teal-600",
    addButton:
      "text-teal-600 hover:text-teal-700 hover:bg-teal-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
    vetCard: "bg-slate-50 rounded-xl p-4 border border-slate-200",
    vetHeader: "flex items-center gap-3 mb-3",
    vetAvatar:
      "w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-xl font-bold text-teal-700",
    vetInfo: "flex-1 min-w-0",
    vetName: "text-base font-semibold text-slate-800 truncate",
    vetCrmv: "text-sm text-slate-600",
    vetSpecialties: "flex flex-wrap gap-1.5 mb-3",
    specialtyTag: "px-2 py-0.5 bg-slate-200 rounded text-xs text-slate-700",
    vetContact: "space-y-1 text-sm text-slate-700",
    vetStatus: "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
  },
});
