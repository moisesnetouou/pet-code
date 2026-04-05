import { tv } from "tailwind-variants";

export const recordCardStyles = tv({
  slots: {
    container:
      "bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5",
    header: "flex items-center justify-between mb-4",
    petInfo: "flex items-center gap-3",
    petAvatar: "w-10 h-10 rounded-lg flex items-center justify-center text-xl",
    petDetails: "",
    petName: "text-base font-semibold text-slate-800",
    petType: "text-sm text-slate-600",
    statusBadge: "px-2.5 py-1 rounded-full text-xs font-medium",
    actionsButton:
      "text-slate-500 hover:text-slate-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer",
    content: "space-y-2",
    infoRow: "flex items-center gap-2 text-sm text-slate-700",
    infoIcon: "w-4 h-4 text-slate-500",
    diagnosisSection: "mt-4 pt-4 border-t border-slate-100",
    diagnosisLabel:
      "text-xs font-medium text-slate-600 uppercase tracking-wide mb-2",
    diagnosisText: "text-sm text-slate-800 font-medium",
    notesText: "text-sm text-slate-700 italic",
  },
  variants: {
    status: {
      conclusão: {},
      pendente: {},
    },
  },
});
