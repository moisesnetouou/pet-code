export const radius = {
  // Border radius scale
  none: "0",
  sm: "0.25rem", // 4px - small elements
  base: "0.375rem", // 6px - inputs, buttons
  md: "0.5rem", // 8px - cards
  lg: "0.75rem", // 12px - modals
  xl: "1rem", // 16px - large containers
  "2xl": "1.5rem", // 24px - hero elements
  full: "9999px", // pills, avatars
  // Semantic radius
  button: "0.5rem", // 8px - standard button
  input: "0.375rem", // 6px - form inputs
  card: "0.75rem", // 12px - card containers
  dialog: "1rem", // 16px - dialogs/modal
  badge: "9999px", // full - badges
} as const;

export type RadiusKey = keyof typeof radius;
