"use client"

import { useState } from 'react'
import { Clock, ArrowRight, Check, Trash2, UserCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { timelineStyles } from './styles'
import type { TimelineProps } from './types'
import { appointments as defaultAppointments, typeConfig } from '../../data'
import { cn } from '@/lib/utils'

function TimelineItem({ appointment, onCheckIn, onCancel }: { 
  appointment: any
  onCheckIn?: (id: number) => void
  onCancel?: (id: number) => void
}) {
  const t = timelineStyles({ status: appointment.status })
  const typeStyle = typeConfig[appointment.type] || { bg: 'bg-slate-50', text: 'text-slate-700' }

  return (
    <div className={t.item()}>
      <div className="flex items-center gap-4">
        <div className={t.itemTime()}>
          {appointment.time}
        </div>
        
        <div className={cn(t.itemAvatar(), appointment.pet.color)}>
          {appointment.pet.emoji}
        </div>
        
        <div className={t.itemContent()}>
          <p className={t.itemName()}>{appointment.petName}</p>
          <p className={t.itemSubtitle()}>{appointment.pet.breed} • {appointment.tutor}</p>
        </div>
        
        <Badge className={cn(t.itemBadge(), typeStyle.bg, typeStyle.text)}>
          {appointment.type}
        </Badge>
        
        <div className={t.itemActions()}>
          {appointment.status === 'agendado' && (
            <>
              <Button 
                size="sm"
                className={t.confirmedButton()}
                onClick={() => onCheckIn?.(appointment.id)}
              >
                <UserCheck className="w-3.5 h-3.5" />
                Confirmar Chegada
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className={t.cancelButton()}
                onClick={() => onCancel?.(appointment.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
                Cancelar
              </Button>
            </>
          )}
          {appointment.status === 'confirmado' && (
            <div className={t.confirmedBadge()}>
              <Check className={t.confirmedBadgeIcon()} />
              <span className={t.confirmedBadgeText()}>Chegada confirmada</span>
            </div>
          )}
          {appointment.status === 'cancelado' && (
            <div className={t.canceledBadge()}>
              <Trash2 className={t.canceledBadgeIcon()} />
              <span className={t.canceledBadgeText()}>Cancelado</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Timeline({ 
  appointments: initialAppointments = defaultAppointments,
  onCheckIn,
  onCancel,
  title = 'Agenda de Hoje',
  subtitle = '01 de Abril de 2026 • Terça-feira',
  showViewAll = true
}: TimelineProps) {
  const t = timelineStyles()
  const [appointments, setAppointments] = useState(initialAppointments)

  const handleCheckIn = (id: number) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, status: 'confirmado' } : apt)
    )
    onCheckIn?.(id)
  }

  const handleCancel = (id: number) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, status: 'cancelado' } : apt)
    )
    onCancel?.(id)
  }

  return (
    <Card className={t.container()}>
      <CardContent className="p-0">
        <div className={t.header()}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={t.headerTitle()}>
                <Clock className={t.headerIcon()} />
                {title}
              </h3>
              <p className={t.headerSubtitle()}>{subtitle}</p>
            </div>
            {showViewAll && (
              <Button variant="ghost" size="sm" className={t.headerAction()}>
                Ver todos <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
        
        <div className={t.list()}>
          {appointments.map((apt) => (
            <TimelineItem 
              key={apt.id} 
              appointment={apt}
              onCheckIn={handleCheckIn}
              onCancel={handleCancel}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
