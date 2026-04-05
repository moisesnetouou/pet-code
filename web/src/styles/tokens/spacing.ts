export const spacing = {
  // Base spacing scale (4px increments)
  0: "0",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  // Semantic spacing
  card: {
    padding: "1.25rem", // 20px - card internal padding
    gap: "1rem", // 16px - gaps inside cards
    gapSmall: "0.75rem", // 12px - tighter gaps
  },
  section: {
    padding: "1.5rem", // 24px - section padding
    gap: "1.5rem", // 24px - gap between sections
  },
  page: {
    padding: "2rem", // 32px - main page padding
    gap: "1.5rem", // 24px - gap between elements
  },
  sidebar: {
    expanded: "16rem", // 256px
    collapsed: "4rem", // 64px
  },
} as const;

export type SpacingKey = keyof typeof spacing;
