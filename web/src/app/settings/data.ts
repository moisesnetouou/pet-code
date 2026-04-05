import type { Preferences, SystemInfo, User } from "./types";

export const users: User[] = [
  {
    id: 1,
    name: "Admin Principal",
    email: "admin@petcode.com.br",
    role: "admin",
    isActive: true,
    lastLogin: "01/04/2026 09:00",
    createdAt: "01/01/2024",
  },
  {
    id: 2,
    name: "Dr. Carlos Silva",
    email: "carlos@petcode.com.br",
    role: "veterinarian",
    isActive: true,
    lastLogin: "01/04/2026 08:30",
    createdAt: "15/03/2024",
  },
  {
    id: 3,
    name: "Dra. Ana Paula",
    email: "ana@petcode.com.br",
    role: "veterinarian",
    isActive: true,
    lastLogin: "31/03/2026 17:00",
    createdAt: "20/04/2024",
  },
  {
    id: 4,
    name: "Recepcionista",
    email: "recepcao@petcode.com.br",
    role: "receptionist",
    isActive: true,
    lastLogin: "01/04/2026 08:00",
    createdAt: "01/06/2024",
  },
  {
    id: 5,
    name: "Dr. Pedro Santos",
    email: "pedro@petcode.com.br",
    role: "veterinarian",
    isActive: false,
    createdAt: "10/07/2024",
  },
];

export const preferences: Preferences = {
  theme: "light",
  language: "pt-BR",
  dateFormat: "DD/MM/YYYY",
  timeFormat: "24h",
  emailNotifications: true,
  pushNotifications: true,
};

export const systemInfo: SystemInfo = {
  version: "1.0.0",
  buildDate: "01/04/2026",
  nodeVersion: "v20.19.5",
  database: "SQLite",
};
