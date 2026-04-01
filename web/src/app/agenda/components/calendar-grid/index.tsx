import { calendarGridStyles } from './styles'
import { CalendarDay } from '../calendar-day'
import type { CalendarEvent } from '../../types'

interface CalendarGridProps {
  days: Date[]
  events: CalendarEvent[]
  getEventsForDay: (date: Date) => CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
  onDayClick?: (date: Date) => void
}

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export function CalendarGrid({ days, getEventsForDay, onEventClick, onDayClick }: CalendarGridProps) {
  const s = calendarGridStyles()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isSameDay = (d1: Date, d2: Date) => 
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()

  return (
    <div className={s.container()}>
      <div className={s.header()}>
        {weekDays.map(day => (
          <div key={day} className={s.headerCell()}>
            {day}
          </div>
        ))}
      </div>
      <div className={s.grid()}>
        {days.map((day, idx) => {
          const dayEvents = getEventsForDay(day)
          const currentMonth = day.getMonth()
          const displayMonth = new Date(today.getFullYear(), today.getMonth(), 1).getMonth()
          
          return (
            <CalendarDay
              key={idx}
              date={day}
              events={dayEvents}
              isCurrentMonth={currentMonth === displayMonth}
              isToday={isSameDay(day, today)}
              onEventClick={onEventClick}
              onDayClick={onDayClick}
            />
          )
        })}
      </div>
    </div>
  )
}