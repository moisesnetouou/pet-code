'use client'

import { useState, useMemo } from 'react'
import { CalendarHeader } from './components/calendar-header'
import { CalendarGrid } from './components/calendar-grid'
import { EventDialog } from './components/event-dialog'
import { events as initialEvents } from './data'
import type { CalendarEvent, CalendarView } from './types'
import { Sidebar } from '../dashboard/components/sidebar'
import { Header } from '../dashboard/components/header'
import { greeting } from '../dashboard/utils/greeting'
import { pets as mockPets } from '../pets/data'

const pets = mockPets.map(p => ({ id: p.id, name: p.name, emoji: p.emoji }))

export default function AgendaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1))
  const [view, setView] = useState<CalendarView>('month')
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const days = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPadding = firstDay.getDay()
    
    const result: Date[] = []
    
    for (let i = startPadding - 1; i >= 0; i--) {
      const d = new Date(year, month, -i)
      result.push(new Date(d.getFullYear(), d.getMonth(), d.getDate()))
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      result.push(new Date(year, month, i))
    }
    
    const remaining = 42 - result.length
    for (let i = 1; i <= remaining; i++) {
      result.push(new Date(year, month + 1, i))
    }
    
    return result
  }, [currentDate])

  const getEventsForDay = (date: Date): CalendarEvent[] => {
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(e => e.start.startsWith(dateStr))
  }

  const handlePrev = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setDialogOpen(true)
  }

  const handleDayClick = (date: Date) => {
    setSelectedEvent(null)
    setDialogOpen(true)
  }

  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    if (selectedEvent) {
      setEvents(events.map(e => e.id === selectedEvent.id ? { ...eventData, id: e.id } : e))
    } else {
      const newId = Math.max(...events.map(e => e.id), 0) + 1
      setEvents([...events, { ...eventData, id: newId }])
    }
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onToggle={setSidebarOpen} />
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header greeting={greeting()} />
        <main className="p-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <CalendarHeader
              currentDate={currentDate}
              view={view}
              onViewChange={setView}
              onPrev={handlePrev}
              onNext={handleNext}
              onToday={handleToday}
            />
            <CalendarGrid
              days={days}
              events={events}
              getEventsForDay={getEventsForDay}
              onEventClick={handleEventClick}
              onDayClick={handleDayClick}
            />
          </div>
        </main>
      </div>

      <EventDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        event={selectedEvent}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        pets={pets}
      />
    </div>
  )
}