import { tv } from "tailwind-variants";

export const nextAppointmentStyles = tv({
  slots: {
    container: "bg-white rounded-xl border border-slate-200 shadow-sm",
    content: "p-5",
    title: "font-bold text-slate-800 mb-3 flex items-center gap-2",
    indicator: "w-2 h-2 bg-amber-500 rounded-full animate-pulse",
    petContainer: "flex items-center gap-3 mb-3",
    petAvatar: "w-14 h-14 rounded-xl flex items-center justify-center text-2xl",
    petInfo: "flex-1 min-w-0",
    petName: "font-bold text-slate-800",
    petBreed: "text-sm text-slate-500",
    timeContainer:
      "flex items-center justify-between bg-slate-50 rounded-lg p-3",
    timeInner: "flex items-center gap-2 text-slate-600",
    timeIcon: "w-4 h-4",
    timeValue: "font-medium",
    typeBadge: "bg-blue-50 text-blue-700",
  },
});

export type NextAppointmentVariants = ReturnType<typeof nextAppointmentStyles>;
