export interface MedicalRecord {
  id: number
  petName: string
  petType: string
  petEmoji: string
  tutor: string
  date: string
  type: MedicalRecordType
  veterinarian: string
  diagnosis?: string
  notes?: string
  status: MedicalRecordStatus
}

export type MedicalRecordType = 'Consulta' | 'Vacinação' | 'Cirurgia' | 'Exame' | 'Check-up'

export type MedicalRecordStatus = 'concluído' | 'pendente'

export interface FilterOptions {
  search: string
  type: MedicalRecordType | 'all'
  status: MedicalRecordStatus | 'all'
  sortBy: 'date' | 'pet' | 'type'
}
