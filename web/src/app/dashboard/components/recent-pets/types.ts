import type { Pet } from '../../types'

export interface RecentPetsProps {
  pets?: Pet[]
  limit?: number
  showViewAll?: boolean
}
