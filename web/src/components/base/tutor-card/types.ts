export type TutorStatus = "ativo" | "inativo";

export interface TutorCardProps {
  name: string;
  pets?: string[];
  status: TutorStatus;
  onClick?: () => void;
  className?: string;
}
