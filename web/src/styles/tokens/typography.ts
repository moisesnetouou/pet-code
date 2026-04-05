export const typography = {
  // Font sizes
  fontSize: {
    xs: "0.75rem", // 12px - captions, timestamps
    sm: "0.875rem", // 14px - secondary text, labels
    base: "1rem", // 16px - body text
    lg: "1.125rem", // 18px - small headings
    xl: "1.25rem", // 20px - card titles
    "2xl": "1.5rem", // 24px - page titles
    "3xl": "1.875rem", // 30px - hero titles
  },
  // Font weights
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  // Line heights
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
  // Heading variants
  heading: {
    h1: {
      fontSize: "1.5rem",
      fontWeight: "700",
      lineHeight: "1.25",
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: "600",
      lineHeight: "1.25",
    },
    h3: {
      fontSize: "1.125rem",
      fontWeight: "600",
      lineHeight: "1.25",
    },
  },
  // Body variants
  body: {
    regular: {
      fontSize: "1rem",
      fontWeight: "400",
      lineHeight: "1.5",
    },
    small: {
      fontSize: "0.875rem",
      fontWeight: "400",
      lineHeight: "1.5",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: "400",
      lineHeight: "1.5",
    },
  },
} as const;

export type TypographyKey = keyof typeof typography;
