import { AlertTriangle, CheckCircle, Package, XCircle } from "lucide-react";
import { statsStyles } from "./styles";

interface StatsCardsProps {
  stats: {
    total: number;
    lowStock: number;
    outOfStock: number;
    normal: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const s = statsStyles();

  return (
    <div className={s.container()}>
      <div className={s.card()}>
        <div className={s.icon()} style={{ backgroundColor: "#f1f5f9" }}>
          <Package size={20} className="text-slate-600" />
        </div>
        <div className={s.value()}>{stats.total}</div>
        <div className={s.label()}>Total de Itens</div>
      </div>

      <div className={s.card()}>
        <div className={s.icon()} style={{ backgroundColor: "#fef3c7" }}>
          <AlertTriangle size={20} className="text-amber-600" />
        </div>
        <div className={s.value()}>{stats.lowStock}</div>
        <div className={s.label()}>Estoque Baixo</div>
      </div>

      <div className={s.card()}>
        <div className={s.icon()} style={{ backgroundColor: "#fee2e2" }}>
          <XCircle size={20} className="text-red-600" />
        </div>
        <div className={s.value()}>{stats.outOfStock}</div>
        <div className={s.label()}>Esgotados</div>
      </div>

      <div className={s.card()}>
        <div className={s.icon()} style={{ backgroundColor: "#d1fae5" }}>
          <CheckCircle size={20} className="text-emerald-600" />
        </div>
        <div className={s.value()}>{stats.normal}</div>
        <div className={s.label()}>Normais</div>
      </div>
    </div>
  );
}
