"use client"

import { Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { nextAppointmentStyles } from './styles'
import type { NextAppointmentProps } from './types'
import { pets as defaultPets } from '../../data'

export function NextAppointment({
  pet = defaultPets[0],
  time = '09:00',
  type = 'Vacinação'
}: NextAppointmentProps) {
  const n = nextAppointmentStyles()

  return (
    <Card className={n.container()}>
      <CardContent className={n.content()}>
        <h3 className={n.title()}>
          <span className={n.indicator()}></span>
          Próximo atendimento
        </h3>
        <div className={n.petContainer()}>
          <div className={n.petAvatar()}>
            {pet.emoji}
          </div>
          <div className={n.petInfo()}>
            <p className={n.petName()}>{pet.name}</p>
            <p className={n.petBreed()}>{pet.breed}</p>
          </div>
        </div>
        <div className={n.timeContainer()}>
          <div className={n.timeInner()}>
            <Clock className={n.timeIcon()} />
            <span className={n.timeValue()}>{time}</span>
          </div>
          <Badge className={n.typeBadge()}>{type}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
