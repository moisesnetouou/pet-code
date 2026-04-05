import type { Tutor } from "../../types";

export interface TutorCardProps {
  tutor: Tutor;
  onClick?: (tutor: Tutor) => void;
}
