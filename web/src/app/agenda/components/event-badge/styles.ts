import { tv } from "tailwind-variants";

export const eventBadgeStyles = tv({
  slots: {
    container:
      "px-2 py-0.5 rounded text-xs font-medium truncate cursor-pointer hover:opacity-80 transition-opacity",
    dot: "w-2 h-2 rounded-full inline-block mr-1.5",
  },
  variants: {
    type: {
      consulta: {
        container: "bg-violet-100 text-violet-800 border border-violet-300",
        dot: "bg-violet-500",
      },
      vacinação: {
        container: "bg-emerald-100 text-emerald-800 border border-emerald-300",
        dot: "bg-emerald-500",
      },
      cirurgia: {
        container: "bg-red-100 text-red-800 border border-red-300",
        dot: "bg-red-500",
      },
      exame: {
        container: "bg-blue-100 text-blue-800 border border-blue-300",
        dot: "bg-blue-500",
      },
      checkup: {
        container: "bg-amber-100 text-amber-800 border border-amber-300",
        dot: "bg-amber-500",
      },
    },
  },
});
