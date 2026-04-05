import { tv } from "tailwind-variants";

export const aboutStyles = tv({
  slots: {
    container: "bg-white rounded-2xl border border-slate-200 shadow-sm p-6",
    header: "flex items-center justify-between mb-6",
    title: "text-lg font-bold text-slate-800 flex items-center gap-2",
    titleIcon: "w-5 h-5 text-teal-600",
    content: "space-y-4",
    infoRow:
      "flex items-center justify-between py-3 border-b border-slate-100 last:border-0",
    infoLabel: "text-sm text-slate-600",
    infoValue: "text-sm font-medium text-slate-800",
    footer: "mt-6 pt-4 border-t border-slate-200 text-center",
    footerText: "text-xs text-slate-500",
  },
});
