import { tv } from "tailwind-variants";

export const recentPetsStyles = tv({
  slots: {
    container: "bg-white rounded-xl border border-slate-200 shadow-sm",
    content: "p-5",
    title: "font-bold text-slate-800 mb-3",
    grid: "grid grid-cols-4 gap-2",
    petItem: "cursor-pointer",
    petAvatar:
      "w-10 h-10 rounded-lg flex items-center justify-center text-lg mx-auto mb-1",
    petName: "text-xs text-center text-slate-600 truncate",
    viewAllButton: "w-full mt-3 text-teal-600 hover:text-teal-700 text-sm",
  },
});

export type RecentPetsVariants = ReturnType<typeof recentPetsStyles>;
