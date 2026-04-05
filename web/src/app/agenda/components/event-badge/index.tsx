import type { CalendarEvent } from "../../types";
import { eventBadgeStyles } from "./styles";

interface EventBadgeProps {
  event: CalendarEvent;
  onClick?: (event: CalendarEvent) => void;
}

export function EventBadge({ event, onClick }: EventBadgeProps) {
  const s = eventBadgeStyles({ type: event.type });

  return (
    <div
      className={s.container()}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(event);
      }}
      title={`${event.petEmoji} ${event.title}`}
    >
      <span className={s.dot()} />
      <span className="truncate">
        {event.petEmoji} {event.title.split(" - ")[1] || event.title}
      </span>
    </div>
  );
}
