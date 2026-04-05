export interface CalendarEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  type: EventType;
  petName: string;
  petEmoji: string;
  tutorName: string;
}

export type EventType =
  | "consulta"
  | "vacinação"
  | "cirurgia"
  | "exame"
  | "checkup";

export type CalendarView = "month" | "week" | "day";

export const eventTypeConfig: Record<
  EventType,
  { bg: string; text: string; border: string; label: string }
> = {
  consulta: {
    bg: "bg-violet-100",
    text: "text-violet-800",
    border: "border-violet-300",
    label: "Consulta",
  },
  vacinação: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    border: "border-emerald-300",
    label: "Vacinação",
  },
  cirurgia: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300",
    label: "Cirurgia",
  },
  exame: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-300",
    label: "Exame",
  },
  checkup: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    border: "border-amber-300",
    label: "Check-up",
  },
};
