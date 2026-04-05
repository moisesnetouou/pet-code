import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
} from "lucide-react";
import type { CalendarView } from "../../types";
import { calendarHeaderStyles } from "./styles";

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function CalendarHeader({
  currentDate,
  view,
  onViewChange,
  onPrev,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  const s = calendarHeaderStyles();

  const monthName = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return (
    <div className={s.container()}>
      <div className={s.navButtons()}>
        <button
          onClick={onPrev}
          className={s.navButton()}
          aria-label="Mês anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <button onClick={onToday} className={s.navButton()} aria-label="Hoje">
          <Calendar size={20} />
        </button>
        <button
          onClick={onNext}
          className={s.navButton()}
          aria-label="Próximo mês"
        >
          <ChevronRight size={20} />
        </button>
        <h2 className={s.title()}>
          {monthName} de {year}
        </h2>
      </div>

      <div className={s.viewSelector()}>
        <button
          onClick={() => onViewChange("month")}
          className={s.viewButton()}
          style={{
            backgroundColor: view === "month" ? "white" : "transparent",
            color: view === "month" ? "#0f172a" : "#64748b",
            boxShadow: view === "month" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
          }}
        >
          <LayoutGrid size={16} className="inline mr-1.5" />
          Mês
        </button>
        <button
          onClick={() => onViewChange("week")}
          className={s.viewButton()}
          style={{
            backgroundColor: view === "week" ? "white" : "transparent",
            color: view === "week" ? "#0f172a" : "#64748b",
            boxShadow: view === "week" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
          }}
        >
          <List size={16} className="inline mr-1.5" />
          Semana
        </button>
        <button
          onClick={() => onViewChange("day")}
          className={s.viewButton()}
          style={{
            backgroundColor: view === "day" ? "white" : "transparent",
            color: view === "day" ? "#0f172a" : "#64748b",
            boxShadow: view === "day" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
          }}
        >
          <Calendar size={16} className="inline mr-1.5" />
          Dia
        </button>
      </div>
    </div>
  );
}
