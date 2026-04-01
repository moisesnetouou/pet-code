"use client"

import { Card, CardContent } from '@/components/ui/card'
import { welcomeBannerStyles } from './styles'
import type { WelcomeBannerProps, StatBoxProps } from './types'
import { appointments } from '../../data'

function StatBox({ value, label, variant = 'today' }: StatBoxProps) {
  const w = welcomeBannerStyles()
  const variantStyles: Record<string, string> = {
    today: w.statBoxToday(),
    confirmed: w.statBoxConfirmed(),
    waiting: w.statBoxWaiting(),
  }
  const valueStyles: Record<string, string> = {
    today: 'text-teal-700',
    confirmed: 'text-emerald-700',
    waiting: 'text-amber-700',
  }
  const labelStyles: Record<string, string> = {
    today: 'text-teal-600',
    confirmed: 'text-emerald-600',
    waiting: 'text-amber-600',
  }

  return (
    <div className={variantStyles[variant]}>
      <p className={w.statValue()}>{value}</p>
      <p className={labelStyles[variant]}>{label}</p>
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
