import { LucideIcon } from 'lucide-react'

export interface Pet {
  id: number
  name: string
  type: string
  breed: string
  emoji: string
  color: string
}

export interface Appointment {
  id: number
  petName: string
  tutor: string
  time: string
  type: AppointmentType
  status: AppointmentStatus
  pet: Pet
}

export type AppointmentType = 'Vacinação' | 'Consulta' | 'Cirurgia' | 'Check-up'

export type AppointmentStatus = 'agendado' | 'confirmado' | 'cancelado'

export interface Stat {
  label: string
  value: string
  subtext: string
  icon: string
}

export interface MenuItem {
  icon: LucideIcon
  label: string
  href: string
  active?: boolean
}

export interface Notification {
  id: number
  title: string
  message: string
  time: string
  type: 'info' | 'warning' | 'success' | 'error'
  read: boolean
}

export interface QuickAction {
  id: string
  label: string
  description: string
  icon: LucideIcon
  color: string
  bgColor: string
}
