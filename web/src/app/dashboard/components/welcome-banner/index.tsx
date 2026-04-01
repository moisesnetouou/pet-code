"use client"

import { Card, CardContent } from '@/components/ui/card'
import { welcomeBannerStyles } from './styles'
import type { WelcomeBannerProps, StatBoxProps } from './types'
import { appointments } from '../../data'
import { cn } from '@/lib/utils'

function StatBox({ value, label, variant = 'today' }: StatBoxProps) {
  const baseStyles = "px-5 py-3 rounded-xl border-2 min-w-[100px] text-center"
  
  const variantStyles: Record<string, string> = {
    today: "bg-white border-teal-300",
    confirmed: "bg-emerald-200 border-emerald-400",
    waiting: "bg-amber-200 border-amber-400",
  }
  
  const valueStyles: Record<string, string> = {
    today: "text-teal-900",
    confirmed: "text-emerald-900",
    waiting: "text-amber-900",
  }
  
  const labelStyles: Record<string, string> = {
    today: "text-teal-700",
    confirmed: "text-emerald-700",
    waiting: "text-amber-700",
  }

  return (
    <div className={cn(baseStyles, variantStyles[variant])}>
      <p className={cn(valueStyles[variant], "text-2xl font-bold")}>{value}</p>
      <p className={cn(labelStyles[variant], "text-xs font-medium")}>{label}</p>
    </div>
  )
}

export function WelcomeBanner({
  title = 'Pronto para mais um dia de cuidado! 🐾',
  totalCount,
  confirmedCount,
  waitingCount,
}: WelcomeBannerProps) {
  const w = welcomeBannerStyles()
  
  const total = totalCount ?? appointments.length
  const confirmed = confirmedCount ?? appointments.filter(a => a.status === 'confirmado').length
  const waiting = waitingCount ?? appointments.filter(a => a.status === 'agendado').length

  return (
    <div className={w.container()}>
      <div className={w.content()}>
        <div>
          <h2 className={w.title()}>{title}</h2>
          <p className={w.stats()}>
            Você tem <span className={w.statNumber()}>{total}</span> agendamentos hoje • 
            <span className={w.statNumber()}> {confirmed}</span> confirmados • 
            <span className={w.statNumber()}> {waiting}</span> aguardando
          </p>
        </div>
        <div className={w.statsContainer()}>
          <StatBox value={total} label="Hoje" variant="today" />
          <StatBox value={confirmed} label="Confirmados" variant="confirmed" />
          <StatBox value={waiting} label="Aguardando" variant="waiting" />
        </div>
      </div>
    </div>
  )
}
