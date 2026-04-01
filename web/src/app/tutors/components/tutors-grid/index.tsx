"use client"

import { Users } from 'lucide-react'
import { tutorsGridStyles } from './styles'
import type { TutorsGridProps } from './types'
import { TutorCard } from '../tutor-card'

export function TutorsGrid({ tutors, onEdit }: TutorsGridProps) {
  const g = tutorsGridStyles()

  if (tutors.length === 0) {
    return (
      <div className={g.empty()}>
        <Users className={g.emptyIcon()} />
        <h3 className={g.emptyTitle()}>Nenhum tutor encontrado</h3>
        <p className={g.emptyDescription()}>
          Tente ajustar os filtros ou cadastrar um novo tutor
        </p>
      </div>
    )
  }

  return (
    <div className={g.container()}>
      {tutors.map((tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} onClick={onEdit} />
      ))}
    </div>
  )
}
