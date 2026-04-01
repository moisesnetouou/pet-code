import type { FilterOptions } from '../../types'

export interface FiltersProps {
  options: FilterOptions
  onChange: (filters: FilterOptions) => void
  totalResults?: number
}
