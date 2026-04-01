import type { Pet } from '../../types'

export interface PetCardProps {
  pet: Pet
  onClick?: (pet: Pet) => void
}
