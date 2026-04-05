import { tv } from "tailwind-variants";

export const statsStyles = tv({
  slots: {
    container: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6",
    card: "bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5",
    icon: "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
    value: "text-2xl font-bold text-slate-800",
    label: "text-sm text-slate-600 mt-1",
  },
});
