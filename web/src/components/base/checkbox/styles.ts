import { tv } from "tailwind-variants";

export const checkboxStyles = tv({
  slots: {
    container: "flex items-center gap-2",
    wrapper: "relative flex items-center justify-center",
    input: "w-4 h-4 rounded border transition-colors cursor-pointer appearance-none bg-none",
    label: "text-sm text-slate-700 cursor-pointer",
  },
  variants: {
    checked: {
      true: {
        wrapper: "inset-0",
        input: "bg-teal-500! border-teal-500! text-white",
      },
      false: {
        input: "border-teal-300 bg-white",
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
  },
  defaultVariants: {
    checked: false,
    disabled: false,
    error: false,
  },
});

export type CheckboxVariants = ReturnType<typeof checkboxStyles>;
