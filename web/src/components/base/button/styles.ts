import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  slots: {
    base: "inline-flex items-center justify-center font-medium transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    icon: "shrink-0",
  },
  variants: {
    variant: {
      primary: {
        base: "bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500/40",
      },
      secondary: {
        base: "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400/40",
      },
      outline: {
        base: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-800 focus:ring-slate-400/40",
      },
      ghost: {
        base: "text-slate-700 hover:bg-slate-100 hover:text-slate-800 focus:ring-slate-400/40",
      },
      destructive: {
        base: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/40",
      },
    },
    size: {
      sm: {
        base: "h-8 px-3 text-sm gap-1.5",
        icon: "w-4 h-4",
      },
      md: {
        base: "h-10 px-4 text-sm gap-2",
        icon: "w-4 h-4",
      },
      lg: {
        base: "h-11 px-6 text-base gap-2",
        icon: "w-5 h-5",
      },
      "icon-sm": {
        base: "size-8",
        icon: "w-4 h-4",
      },
      "icon-md": {
        base: "size-10",
        icon: "w-5 h-5",
      },
      "icon-lg": {
        base: "size-11",
        icon: "w-5 h-5",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonVariants = ReturnType<typeof buttonStyles>;
