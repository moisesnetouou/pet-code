export type StockStatus = "ativo" | "inativo";
export type StockType =
  | "medication"
  | "food"
  | "toy"
  | "vaccine"
  | "material"
  | "other";

export interface StockCardProps {
  name: string;
  type: StockType;
  typeLabel: string;
  quantity: number;
  minQuantity?: number;
  unit?: string;
  description?: string;
  image?: string;
  status?: StockStatus;
  onClick?: () => void;
  className?: string;
}
