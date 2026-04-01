import type { CalendarEvent } from './types'

export const events: CalendarEvent[] = [
  { id: 1, title: 'Cheems - Consulta', start: '2026-04-01T09:00', end: '2026-04-01T09:30', type: 'consulta', petName: 'Cheems', petEmoji: '🐕', tutorName: 'João Silva' },
  { id: 2, title: 'Luna - Vacinação', start: '2026-04-01T10:00', end: '2026-04-01T10:15', type: 'vacinação', petName: 'Luna', petEmoji: '🐱', tutorName: 'Maria Santos' },
  { id: 3, title: 'Thor - Cirurgia', start: '2026-04-01T14:00', end: '2026-04-01T16:00', type: 'cirurgia', petName: 'Thor', petEmoji: '🐕', tutorName: 'Roberto Alves' },
  { id: 4, title: 'Pirata - Check-up', start: '2026-04-02T09:00', end: '2026-04-02T09:30', type: 'checkup', petName: 'Pirata', petEmoji: '🦜', tutorName: 'Ana Costa' },
  { id: 5, title: 'Rexy - Exame', start: '2026-04-02T11:00', end: '2026-04-02T11:20', type: 'exame', petName: 'Rexy', petEmoji: '🦕', tutorName: 'Carlos Lima' },
  { id: 6, title: 'Florzinha - Consulta', start: '2026-04-03T15:00', end: '2026-04-03T15:30', type: 'consulta', petName: 'Florzinha', petEmoji: '🐱', tutorName: 'Carlos Lima' },
  { id: 7, title: 'Mia - Vacinação', start: '2026-04-04T10:00', end: '2026-04-04T10:15', type: 'vacinação', petName: 'Mia', petEmoji: '🐱', tutorName: 'Patricia Souza' },
  { id: 8, title: 'Sonia - Consulta', start: '2026-04-05T09:00', end: '2026-04-05T09:30', type: 'consulta', petName: 'Sonia', petEmoji: '🐱', tutorName: 'Fernanda Lima' },
  { id: 9, title: 'Bidu - Cirurgia', start: '2026-04-07T08:00', end: '2026-04-07T10:00', type: 'cirurgia', petName: 'Bidu', petEmoji: '🐕', tutorName: 'Beatriz Rodrigues' },
  { id: 10, title: 'Spike - Check-up', start: '2026-04-08T14:00', end: '2026-04-08T14:30', type: 'checkup', petName: 'Spike', petEmoji: '🐕', tutorName: 'Diego Santos' },
  { id: 11, title: 'Lilo - Consulta', start: '2026-04-10T11:00', end: '2026-04-10T11:30', type: 'consulta', petName: 'Lilo', petEmoji: '🐱', tutorName: 'Amanda Pereira' },
  { id: 12, title: 'Nemo - Exame', start: '2026-04-12T16:00', end: '2026-04-12T16:20', type: 'exame', petName: 'Nemo', petEmoji: '🐠', tutorName: 'Julia Oliveira' },
]

export const currentMonth = 4
export const currentYear = 2026