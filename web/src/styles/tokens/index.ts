export type { ColorKey } from "./colors";
export { colors } from "./colors";
export type { RadiusKey } from "./radius";
export { radius } from "./radius";
export type { SpacingKey } from "./spacing";
export { spacing } from "./spacing";
export type { TypographyKey } from "./typography";
export { typography } from "./typography";

// Convenient exports for common use cases
export const buttonColors = {
  primary: {
    bg: "bg-teal-500",
    hover: "hover:bg-teal-600",
    text: "text-white",
  },
  secondary: {
    bg: "bg-slate-100",
    hover: "hover:bg-slate-200",
    text: "text-slate-700",
  },
  danger: {
    bg: "bg-red-500",
    hover: "hover:bg-red-600",
    text: "text-white",
  },
  outline: {
    bg: "bg-transparent",
    hover: "hover:bg-slate-100",
    text: "text-slate-700",
    border: "border border-slate-200",
  },
  ghost: {
    bg: "bg-transparent",
    hover: "hover:bg-slate-100",
    text: "text-slate-700",
  },
} as const;

export const textColors = {
  primary: "text-slate-800",
  secondary: "text-slate-700",
  tertiary: "text-slate-600",
  quaternary: "text-slate-500",
} as const;

export const inputColors = {
  bg: "bg-white",
  border: "border border-slate-300",
  borderHover: "border-slate-400",
  text: "text-slate-800",
  placeholder: "placeholder:text-slate-400",
  focus: "focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
} as const;
