'use client'

import { useState } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { eventDialogStyles } from './styles'
import type { CalendarEvent, EventType } from '../../types'
import { eventTypeConfig } from '../../types'

interface EventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event?: CalendarEvent | null
  onSave: (event: Omit<CalendarEvent, 'id'>) => void
  onDelete?: (id: number) => void
  pets: { id: number; name: string; emoji: string }[]
}

const eventTypes: EventType[] = ['consulta', 'vacinação', 'cirurgia', 'exame', 'checkup']

interface FormData {
  title: string
  petId: string
  type: EventType
  date: string
  startTime: string
  endTime: string
}

const getInitialFormData = (): FormData => ({
  title: '',
  petId: '',
  type: 'consulta',
  date: new Date().toISOString().split('T')[0],
  startTime: '09:00',
  endTime: '09:30',
})

export function EventDialog({ open, onOpenChange, event, onSave, onDelete, pets }: EventDialogProps) {
  const s = eventDialogStyles()
  const [formData, setFormData] = useState<FormData>(getInitialFormData())

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData(getInitialFormData())
    }
    onOpenChange(isOpen)
  }

  const handleSubmit = () => {
    const pet = pets.find(p => p.name === formData.petId)
    onSave({
      title: formData.title,
      start: `${formData.date}T${formData.startTime}`,
      end: `${formData.date}T${formData.endTime}`,
      type: formData.type,
      petName: formData.petId,
      petEmoji: pet?.emoji || '🐾',
      tutorName: 'Tutor',
    })
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-slate-800">
            {event ? 'Editar Evento' : 'Novo Evento'}
          </DialogTitle>
        </DialogHeader>
        
        <div className={s.form()}>
          <div className={s.field()}>
            <Label htmlFor="title" className={s.label()}>Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Cheems - Consulta"
              className="bg-white border-slate-200 text-slate-800"
            />
          </div>

          <div className={s.field()}>
            <Label htmlFor="pet" className={s.label()}>Pet</Label>
            <select
              id="pet"
              value={formData.petId}
              onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <option value="">Selecione um pet</option>
              {pets.map(pet => (
                <option key={pet.id} value={pet.name}>
                  {pet.emoji} {pet.name}
                </option>
              ))}
            </select>
          </div>

          <div className={s.field()}>
            <Label htmlFor="type" className={s.label()}>Tipo</Label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              {eventTypes.map(type => (
                <option key={type} value={type}>
                  {eventTypeConfig[type].label}
                </option>
              ))}
            </select>
          </div>

          <div className={s.field()}>
            <Label htmlFor="date" className={s.label()}>Data</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="bg-white border-slate-200 text-slate-800"
            />
          </div>

          <div className={s.row()}>
            <div className={s.field()}>
              <Label htmlFor="start" className={s.label()}>Início</Label>
              <Input
                id="start"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="bg-white border-slate-200 text-slate-800"
              />
            </div>
            <div className={s.field()}>
              <Label htmlFor="end" className={s.label()}>Fim</Label>
              <Input
                id="end"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="bg-white border-slate-200 text-slate-800"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          {event && onDelete && (
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete}
              className="mr-auto bg-red-500 hover:bg-red-600 text-white"
            >
              Excluir
            </Button>
          )}
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            Cancelar
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}