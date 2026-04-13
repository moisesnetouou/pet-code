import type { QuickAction } from "../../types";

export interface QuickActionsProps {
  actions?: QuickAction[];
  onOpenPetDialog?: () => void;
  onOpenTutorDialog?: () => void;
  onOpenRecordDialog?: () => void;
}
