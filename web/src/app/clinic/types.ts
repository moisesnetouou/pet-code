export interface Clinic {
  id: number
  name: string
  cnpj: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  cep: string
}

export interface Schedule {
  id: number
  day: ScheduleDay
  label: string
  open: string
  close: string
  isClosed: boolean
  is24h: boolean
}

export type ScheduleDay = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo'

export interface Service {
  id: number
  name: string
  description: string
  price: number
  duration: number
  isActive: boolean
}

export interface Veterinarian {
  id: number
  name: string
  crmv: string
  specialties: string[]
  phone: string
  email: string
  isActive: boolean
  avatar?: string
}
