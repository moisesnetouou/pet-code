"use client"

import { PawPrint } from 'lucide-react'
import { petsGridStyles } from './styles'
import type { PetsGridProps } from './types'
import { PetCard } from '../pet-card'

export function PetsGrid({ pets }: PetsGridProps) {
  const g = petsGridStyles()

  if (pets.length === 0) {
    return (
      <div className={g.empty()}>
        <PawPrint className={g.emptyIcon()} />
        <h3 className={g.emptyTitle()}>Nenhum pet encontrado</h3>
        <p className={g.emptyDescription()}>
          Tente ajustar os filtros ou cadastrar um novo pet
        </p>
      </div>
    )
  }

  return (
    <div className={g.container()}>
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  )
}
