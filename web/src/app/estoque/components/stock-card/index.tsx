import type { StockItem, StockType } from "../../types";
import { getStockStatus, stockTypeColors, stockTypeLabels } from "../../types";
import { stockCardStyles } from "./styles";

interface StockCardProps {
  item: StockItem;
  onClick?: (item: StockItem) => void;
}

export function StockCard({ item, onClick }: StockCardProps) {
  const s = stockCardStyles();
  const status = getStockStatus(item);

  const statusStyles: Record<string, { bg: string; text: string }> = {
    red: { bg: "bg-red-100", text: "text-red-800" },
    amber: { bg: "bg-amber-100", text: "text-amber-800" },
    emerald: { bg: "bg-emerald-100", text: "text-emerald-800" },
  };

  return (
    <div className={s.container()} onClick={() => onClick?.(item)}>
      <div className={s.imageContainer()}>
        <img
          src={item.imageUrl}
          alt={item.name}
          className={s.image()}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1584308666744-24a5c6f2302f?w=200&h=200&fit=crop";
          }}
        />
        <span
          className={`${s.typeBadge()} ${stockTypeColors[item.type as StockType]}`}
        >
          {stockTypeLabels[item.type as StockType]}
        </span>
      </div>

      <div className={s.content()}>
        <div className={s.header()}>
          <h3 className={s.name()}>{item.name}</h3>
          <span
            className={`${s.badge()} ${statusStyles[status.color].bg} ${statusStyles[status.color].text}`}
          >
            {status.label}
          </span>
        </div>

        <p className={s.description()}>{item.description}</p>

        <div className={s.footer()}>
          <div>
            <span className={s.quantity()}>{item.quantity}</span>
            <span className={s.unit()}> {item.unit}</span>
          </div>
          <div className={s.minLabel()}>
            Mín: {item.minQuantity} {item.unit}
          </div>
        </div>
      </div>
    </div>
  );
}
