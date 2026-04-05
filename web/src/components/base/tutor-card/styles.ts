import { tv } from "tailwind-variants";

export const tutorCardStyles = tv({
  slots: {
    container:
      "bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5",
    header: "flex items-start justify-between mb-4",
    avatarContainer:
      "w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center",
    avatarInitials: "text-lg font-bold text-teal-700",
    content: "space-y-2",
    name: "text-lg font-semibold text-slate-800",
    infoRow: "flex items-center gap-2 text-sm text-slate-600",
    infoIcon: "w-4 h-4 text-slate-400",
    petsSection: "mt-4 pt-4 border-t border-slate-100",
    petsLabel:
      "text-xs font-medium text-slate-500 uppercase tracking-wide mb-2",
    petTag:
      "inline-flex items-center px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-700",
    statusBadge: "",
  },
  variants: {
    status: {
      ativo: {
        statusBadge: "bg-emerald-50 text-emerald-700",
      },
      inativo: {
        statusBadge: "bg-slate-100 text-slate-600",
      },
    },
  },
});

export type TutorCardVariants = ReturnType<typeof tutorCardStyles>;
