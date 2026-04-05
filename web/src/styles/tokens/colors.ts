export const colors = {
  // Brand
  brand: {
    primary: "teal-500",
    primaryHover: "teal-600",
    primaryLight: "teal-50",
  },
  // Text hierarchy
  text: {
    primary: "slate-800", // Títulos, nomes
    secondary: "slate-700", // Corpo de texto
    tertiary: "slate-600", // Labels, auxiliares
    quaternary: "slate-500", // Placeholders, ícones
  },
  // Backgrounds
  background: {
    page: "slate-50",
    card: "white",
    input: "white",
    subtle: "slate-100",
  },
  // Border
  border: {
    default: "slate-200",
    hover: "slate-300",
    focus: "teal-500",
  },
  // Status
  status: {
    success: {
      bg: "emerald-100",
      text: "emerald-800",
    },
    warning: {
      bg: "amber-100",
      text: "amber-800",
    },
    error: {
      bg: "red-100",
      text: "red-800",
    },
    info: {
      bg: "blue-100",
      text: "blue-800",
    },
  },
  // Entity types (for pets, stock, etc)
  entity: {
    cachorro: "amber",
    gato: "violet",
    passaro: "sky",
    peixe: "blue",
    coelho: "rose",
    jabuti: "emerald",
    outro: "slate",
    // Stock types
    stock: {
      medication: "violet",
      food: "amber",
      toy: "pink",
      vaccine: "emerald",
      material: "blue",
      other: "slate",
    },
    // Legacy aliases (deprecated - use stock.* instead)
    medication: "violet",
    racao: "amber",
    brinquedo: "pink",
    vaccine: "emerald",
    material: "blue",
    outroStock: "slate",
  },
} as const;

export type ColorKey = keyof typeof colors;
