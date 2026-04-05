import { tv } from "tailwind-variants";

export const calendarGridStyles = tv({
  slots: {
    container: "w-full",
    header: "grid grid-cols-7 border-b border-slate-200",
    headerCell: "py-3 text-center text-sm font-semibold text-slate-600",
    grid: "grid grid-cols-7",
  },
});
