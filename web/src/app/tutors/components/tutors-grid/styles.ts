import { tv } from "tailwind-variants";

export const tutorsGridStyles = tv({
  slots: {
    container:
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
    empty: "flex flex-col items-center justify-center py-16 text-center",
    emptyIcon: "w-16 h-16 text-slate-300 mb-4",
    emptyTitle: "text-xl font-semibold text-slate-700 mb-2",
    emptyDescription: "text-slate-500",
  },
});
