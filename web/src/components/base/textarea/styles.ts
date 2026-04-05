import { tv } from "tailwind-variants";

export const textareaStyles = tv({
  slots: {
    base: "flex flex-col gap-1.5",
    label: "text-sm font-medium transition-colors",
    textarea:
      "w-full rounded-lg border px-4 py-3 text-sm transition-all resize-none",
    error: "text-xs font-medium",
    helper: "text-xs text-slate-500",
  },
  variants: {
    state: {
      default: {
        label: "text-slate-700",
        textarea:
          "border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 hover:border-slate-400",
      },
      focus: {
        label: "text-teal-700",
        textarea: "border-teal-500 ring-2 ring-teal-500/20",
      },
      filled: {
        label: "text-slate-700",
        textarea: "border-slate-400 bg-white text-slate-800",
      },
      disabled: {
        label: "text-slate-400",
        textarea:
          "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-50",
      },
      error: {
        label: "text-red-700",
        textarea: "border-red-500 ring-2 ring-red-500/20",
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export type TextareaVariants = ReturnType<typeof textareaStyles>;
