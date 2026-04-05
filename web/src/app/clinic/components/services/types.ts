import type { Service } from "../../types";

export type { Service };

export interface ServicesProps {
  services: Service[];
  onToggle?: (id: number) => void;
}
