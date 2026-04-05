"use client";

import { StatusBadge, TypeBadge } from "../badge";
import { stockCardStyles } from "./styles";
import type { StockCardProps, StockStatus, StockType } from "./types";

const StockCard = ({
  name,
  type,
  typeLabel,
  quantity,
  minQuantity,
  unit = "un",
  description,
  image,
  status = "ativo",
  onClick,
  className,
}: StockCardProps) => {
  const s = stockCardStyles();

  const isLow = minQuantity && quantity <= minQuantity;

  return (
    <div className={s.container()} onClick={onClick}>
      {image && (
        <div className={s.imageContainer()}>
          <img src={image} alt={name} className={s.image()} />
          <div className={s.typeBadge()}>
            <TypeBadge type={type.toUpperCase()} label={typeLabel} />
          </div>
        </div>
      )}

      <div className={s.content()}>
        <div className={s.header()}>
          <h3 className={s.name()}>{name}</h3>
          <StatusBadge status={status} />
        </div>

        {description && <p className={s.description()}>{description}</p>}

        <div className={s.footer()}>
          <div>
            <span className={s.quantity()}>{quantity}</span>
            <span className={s.unit()}> {unit}</span>
          </div>
          {minQuantity && isLow && (
            <span className="text-xs text-amber-600 font-medium">
              Estoque baixo
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export type { StockCardProps, StockStatus, StockType };
export { StockCard };
