import { tv } from "tailwind-variants";

export const welcomeBannerStyles = tv({
  slots: {
    container: "bg-teal-50 border border-teal-200 rounded-2xl p-6 mb-8",
    content: "flex items-center justify-between",
    textContainer: "",
    title: "text-lg font-semibold text-teal-800",
    stats: "text-sm text-teal-600 mt-1",
    statNumber: "font-semibold",
    statsContainer: "hidden md:flex items-center gap-4 text-sm",
    statBox:
      "text-center px-8 py-5 rounded-3xl border-2 min-w-[130px] bg-white",
    statBoxToday: "border-teal-300",
    statBoxConfirmed: "border-emerald-400",
    statBoxWaiting: "border-amber-400",
    statValue: "text-3xl font-bold",
    statLabel: "text-sm font-medium",
  },
  variants: {
    statVariant: {
      today: { statValue: "text-teal-900", statLabel: "text-teal-700" },
      confirmed: {
        statValue: "text-emerald-900",
        statLabel: "text-emerald-700",
      },
      waiting: { statValue: "text-amber-900", statLabel: "text-amber-700" },
    },
  },
});

export type WelcomeBannerVariants = ReturnType<typeof welcomeBannerStyles>;
