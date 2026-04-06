import { tv } from "tailwind-variants";

export const usersStyles = tv({
  slots: {
    container: "bg-white rounded-2xl border border-slate-200 shadow-sm p-6",
    header: "flex items-center justify-between mb-6",
    title: "text-lg font-bold text-slate-800 flex items-center gap-2",
    titleIcon: "w-5 h-5 text-teal-600",
    addButton:
      "text-teal-600 hover:text-teal-700 hover:bg-teal-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
    table: "w-full",
    tableHeader:
      "text-left text-xs font-medium text-slate-600 uppercase tracking-wide py-3 border-b border-slate-200",
    tableRow: "border-b border-slate-100 hover:bg-slate-50 transition-colors",
    tableCell: "py-3 text-sm text-slate-700",
    userInfo: "flex items-center gap-3",
    userAvatar:
      "w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-sm font-bold text-teal-700",
    userName: "font-medium text-slate-800",
    userEmail: "text-xs text-slate-500",
    roleBadge: "px-2 py-0.5 rounded text-xs font-medium",
    actionsButton:
      "p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors",
  },
});
