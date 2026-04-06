import { tv } from "tailwind-variants";

export const selectStyles = tv({
  base: "relative w-full",
  slots: {
    label: "text-sm font-medium text-slate-700 mb-1.5",
    trigger:
      "flex h-10 w-full items-center text-slate-400 justify-between rounded-xl bg-white px-4 py-2 text-sm border border-teal-300 transition-all cursor-pointer hover:border-teal-400 focus:outline-none focus:outline-2 focus:outline-teal-500 disabled:bg-slate-100 disabled:border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed",
    content:
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    viewport: "p-1",
    item: "relative flex h-9 cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm text-slate-700 outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    itemIndicator:
      "absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-teal-500",
    groupLabel: "px-2 py-1.5 text-xs font-semibold text-slate-500",
    separator: "-mx-1 my-1 h-px bg-slate-100",
    icon: "h-4 w-4 text-slate-400 shrink-0",
    value: "text-slate-800",
    placeholder: "text-slate-400",
  },
  variants: {
    state: {
      default: {
        trigger: "border-teal-300 hover:border-teal-400",
      },
      focus: {
        trigger: "border-teal-500 outline-2 outline-teal-500",
      },
      open: {
        trigger: "border-teal-500 outline-2 outline-teal-500",
      },
      disabled: {
        trigger: "bg-slate-100 border-slate-200 opacity-50",
      },
      error: {
        trigger: "border-red-500 outline-2 outline-red-500",
      },
    },
    size: {
      sm: {
        trigger: "h-8 text-xs px-3",
      },
      md: {
        trigger: "h-10 text-sm px-4",
      },
      lg: {
        trigger: "h-12 text-base px-5",
      },
    },
  },
  defaultVariants: {
    state: "default",
    size: "md",
  },
});

export type SelectVariants = ReturnType<typeof selectStyles>;
