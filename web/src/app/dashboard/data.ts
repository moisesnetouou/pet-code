import { 
  LayoutDashboard, 
  Calendar, 
  PawPrint, 
  Users, 
  ClipboardList, 
  Building2, 
  Settings,
  Package,
  PawPrint as PawIcon,
  Calendar as CalendarIcon,
  Stethoscope,
  UserPlus,
  CalendarPlus,
  ClipboardList as ClipIcon,
} from 'lucide-react'
import type { MenuItem, Pet, Stat, QuickAction, Notification, Appointment } from './types'

export const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Painel', href: '/dashboard', active: true },
  { icon: Calendar, label: 'Agenda', href: '/agenda' },
  { icon: PawPrint, label: 'Pets', href: '/pets' },
  { icon: Users, label: 'Tutores', href: '/tutors' },
  { icon: ClipboardList, label: 'Prontuários', href: '/records' },
  { icon: Package, label: 'Estoque', href: '/estoque' },
  { icon: Building2, label: 'Clínica', href: '/clinic' },
  { icon: Settings, label: 'Configurações', href: '/settings' },
]

export const pets: Pet[] = [
  { id: 1, name: 'Cheems', type: 'Cachorro', breed: 'Golden Retriever', emoji: '🐕', color: 'bg-amber-100' },
  { id: 2, name: 'Luna', type: 'Gato', breed: 'Siamês', emoji: '🐱', color: 'bg-violet-100' },
  { id: 3, name: 'Manuelita', type: 'Jabuti', breed: 'Jabuti terrestre', emoji: '🐢', color: 'bg-emerald-100' },
  { id: 4, name: 'Pirata', type: 'Papagaio', breed: 'Agapornis', emoji: '🦜', color: 'bg-sky-100' },
  { id: 5, name: 'Rexy', type: 'Dinossauro', breed: 'T-Rex', emoji: '🦕', color: 'bg-green-100' },
  { id: 6, name: 'Nemo', type: 'Peixe', breed: 'Peixe payaso', emoji: '🐠', color: 'bg-blue-100' },
  { id: 7, name: 'Florzinha', type: 'Gato', breed: 'Persa', emoji: '🐱', color: 'bg-pink-100' },
  { id: 8, name: 'Poopy', type: 'Coelho', breed: 'Holland Lop', emoji: '🐰', color: 'bg-rose-100' },
]

export const appointments: Appointment[] = [
  { id: 1, petName: 'Cheems', tutor: 'João Silva', time: '09:00', type: 'Vacinação', status: 'confirmado', pet: pets[0] },
  { id: 2, petName: 'Luna', tutor: 'Maria Santos', time: '10:30', type: 'Consulta', status: 'agendado', pet: pets[1] },
  { id: 3, petName: 'Manuelita', tutor: 'Pedro Santos', time: '14:00', type: 'Cirurgia', status: 'agendado', pet: pets[2] },
  { id: 4, petName: 'Pirata', tutor: 'Ana Costa', time: '15:30', type: 'Check-up', status: 'agendado', pet: pets[3] },
  { id: 5, petName: 'Florzinha', tutor: 'Carlos Lima', time: '16:00', type: 'Vacinação', status: 'confirmado', pet: pets[6] },
  { id: 6, petName: 'Poopy', tutor: 'Julia Oliveira', time: '17:00', type: 'Consulta', status: 'agendado', pet: pets[7] },
]

export const stats: Stat[] = [
  { label: 'Pets cadastrados', value: '234', subtext: '+12 esta semana', icon: '🐕' },
  { label: 'Agendamentos hoje', value: '18', subtext: '6 confirmados', icon: '📅' },
  { label: 'Consultas esta semana', value: '89', subtext: '12 procedimentos', icon: '🩺' },
  { label: 'Faturamento mensal', value: 'R$ 12.4k', subtext: '+8% vs último mês', icon: '💰' },
]

export const quickActions: QuickAction[] = [
  { id: 'pet', label: 'Cadastrar Pet', description: 'Adicionar novo pet', icon: PawIcon, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { id: 'appointment', label: 'Novo Agendamento', description: 'Marcar consulta', icon: CalendarPlus, color: 'text-violet-600', bgColor: 'bg-violet-100' },
  { id: 'tutor', label: 'Cadastrar Tutor', description: 'Adicionar responsável', icon: UserPlus, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  { id: 'record', label: 'Prontuário', description: 'Histórico médico', icon: ClipIcon, color: 'text-rose-600', bgColor: 'bg-rose-100' },
]

export const notifications: Notification[] = [
  { id: 1, title: 'Nova consulta agendada', message: 'Cheems - João Silva às 09:00', time: '5 min', type: 'info', read: false },
  { id: 2, title: 'Lembrete de vacinação', message: 'Pirata precisa vacinar em 15 dias', time: '1 hora', type: 'warning', read: false },
  { id: 3, title: 'Consulta confirmada', message: 'Florzinha confirmou presença', time: '2 horas', type: 'success', read: true },
]

export const typeConfig: Record<string, { bg: string; text: string }> = {
  'Vacinação': { bg: 'bg-blue-50', text: 'text-blue-700' },
  'Consulta': { bg: 'bg-violet-50', text: 'text-violet-700' },
  'Cirurgia': { bg: 'bg-rose-50', text: 'text-rose-700' },
  'Check-up': { bg: 'bg-emerald-50', text: 'text-emerald-700' },
}
