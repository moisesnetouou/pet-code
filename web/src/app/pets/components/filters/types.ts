import type { PetType, PetStatus, FilterOptions } from '../../types'

export interface FiltersProps {
  options: FilterOptions
  onChange: (options: FilterOptions) => void
  totalResults?: number
}
