import { tv } from "tailwind-variants";

export const petCardStyles = tv({
  slots: {
    container:
      "bg-white rounded-2xl border border-slate-200 p-4 hover:border-teal-300 hover:shadow-lg transition-all cursor-pointer group",
    header: "flex items-start justify-between mb-3",
    avatarContainer:
      "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm",
    content: "",
    name: "text-lg font-bold text-slate-800 group-hover:text-teal-600 transition-colors",
    breed: "text-sm text-slate-600",
    infoRow: "flex items-center gap-2 text-sm text-slate-600 mt-2",
    infoIcon: "w-4 h-4 text-slate-500",
    tutorSection: "mt-3 pt-3 border-t border-slate-100",
    tutorLabel: "text-xs text-slate-500",
    tutorName: "text-sm font-medium text-slate-700",
  },
  variants: {
    status: {
      ativo: { container: "border-emerald-200" },
      inativo: { container: "border-slate-200" },
    },
  },
  defaultVariants: {
    status: "ativo",
  },
});

export type PetCardVariants = ReturnType<typeof petCardStyles>;
