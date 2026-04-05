export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export type UserRole = "admin" | "veterinarian" | "receptionist";

export interface Preferences {
  theme: "light" | "dark" | "system";
  language: "pt-BR" | "en-US";
  dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  timeFormat: "12h" | "24h";
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface SystemInfo {
  version: string;
  buildDate: string;
  nodeVersion: string;
  database: string;
}
