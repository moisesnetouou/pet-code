import { calendarDayStyles } from './styles'
import { EventBadge } from '../event-badge'
import type { CalendarEvent } from '../../types'

interface CalendarDayProps {
  date: Date
  events: CalendarEvent[]
  isCurrentMonth: boolean
  isToday: boolean
  onEventClick?: (event: CalendarEvent) => void
  onDayClick?: (date: Date) => void
}

export function CalendarDay({ date, events, isCurrentMonth, isToday, onEventClick, onDayClick }: CalendarDayProps) {
  const s = calendarDayStyles({ isCurrentMonth, isToday })

  return (
    <div 
      className={s.container()} 
      onClick={() => onDayClick?.(date)}
    >
      <div className={s.header()}>
        <span style={{ color: isToday ? '#0d9488' : isCurrentMonth ? '#475569' : '#94a3b8' }}>
          {date.getDate()}
        </span>
      </div>
      <div className={s.events()}>
        {events.slice(0, 3).map(event => (
          <EventBadge 
            key={event.id} 
            event={event} 
            onClick={onEventClick} 
          />
        ))}
        {events.length > 3 && (
          <div className="text-xs text-slate-500 pl-1">
            +{events.length - 3} mais
          </div>
        )}
      </div>
    </div>
  )
}