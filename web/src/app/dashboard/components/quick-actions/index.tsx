"use client"

import { Card, CardContent } from '@/components/ui/card'
import { quickActionsStyles } from './styles'
import type { QuickActionsProps } from './types'
import { quickActions as defaultActions } from '../../data'
import { PawPrint, CalendarPlus, Users, ClipboardList } from 'lucide-react'

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  pet: PawPrint,
  appointment: CalendarPlus,
  tutor: Users,
  record: ClipboardList,
}

export function QuickActions({ actions = defaultActions }: QuickActionsProps) {
  const q = quickActionsStyles()

  return (
    <Card className={q.container()}>
      <CardContent className={q.content()}>
        <h3 className={q.title()}>Ações rápidas</h3>
        <div className={q.grid()}>
          {actions.map((action) => {
            const Icon = iconComponents[action.id] || PawPrint
            const iconClass = action.id === 'pet' ? q.iconContainerBlue() 
              : action.id === 'appointment' ? q.iconContainerViolet()
              : action.id === 'tutor' ? q.iconContainerEmerald()
              : q.iconContainerRose()
            
            return (
              <button key={action.id} className={q.actionButton()}>
                <div className={iconClass}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className={q.label()}>{action.label}</p>
                <p className={q.description()}>{action.description}</p>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
