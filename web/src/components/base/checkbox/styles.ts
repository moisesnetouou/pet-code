import { tv } from "tailwind-variants";

export const checkboxStyles = tv({
  slots: {
    container: "flex items-center gap-2",
    input: "w-4 h-4 rounded border transition-colors cursor-pointer",
    label: "text-sm text-slate-700 cursor-pointer",
  },
  variants: {
    checked: {
      true: {
        input: "bg-teal-500 border-teal-500 text-white",
      },
      false: {
        input: "border-slate-300 bg-white",
      },
    },
    disabled: {
      true: {
        input: "bg-slate-100 border-slate-200 cursor-not-allowed opacity-50",
        label: "cursor-not-allowed opacity-50",
      },
    },
    error: {
      true: {
        input: "border-red-500",
      },
    },
    state: {
      default: {},
      focus: {
        input: "ring-2 ring-teal-500/20",
      },
    },
  },
  defaultVariants: {
    checked: false,
    disabled: false,
    error: false,
    state: "default",
  },
});

export type CheckboxVariants = ReturnType<typeof checkboxStyles>;
