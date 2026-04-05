import type { Appointment } from "../../types";

export interface TimelineProps {
  appointments?: Appointment[];
  onCheckIn?: (id: number) => void;
  onCancel?: (id: number) => void;
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
}

export interface TimelineItemProps {
  appointment: Appointment;
  onCheckIn?: (id: number) => void;
  onCancel?: (id: number) => void;
}
