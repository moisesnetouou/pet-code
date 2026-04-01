import type { Tutor } from '../../types'

export interface TutorsGridProps {
  tutors: Tutor[]
  onEdit?: (tutor: Tutor) => void
}