import type { Pet, PetType, PetStatus } from './types'

export const petColors: Record<PetType, string> = {
  Cachorro: 'bg-amber-100',
  Gato: 'bg-violet-100',
  Pássaro: 'bg-sky-100',
  Peixe: 'bg-blue-100',
  Coelho: 'bg-rose-100',
  Jabuti: 'bg-emerald-100',
  Outro: 'bg-slate-100',
}

export const pets: Pet[] = [
  { id: 1, name: 'Cheems', type: 'Cachorro', breed: 'Golden Retriever', age: '3 anos', weight: '28kg', emoji: '🐕', color: 'bg-amber-100', tutor: 'João Silva', tutorPhone: '(11) 99999-0001', lastVisit: '15/03/2026', nextVisit: '15/06/2026', status: 'ativo', notes: 'Vacinas em dia' },
  { id: 2, name: 'Luna', type: 'Gato', breed: 'Siamês', age: '2 anos', weight: '4kg', emoji: '🐱', color: 'bg-violet-100', tutor: 'Maria Santos', tutorPhone: '(11) 99999-0002', lastVisit: '20/03/2026', status: 'ativo' },
  { id: 3, name: 'Manuelita', type: 'Jabuti', breed: 'Jabuti terrestre', age: '15 anos', weight: '5kg', emoji: '🐢', color: 'bg-emerald-100', tutor: 'Pedro Santos', tutorPhone: '(11) 99999-0003', lastVisit: '10/03/2026', status: 'ativo' },
  { id: 4, name: 'Pirata', type: 'Pássaro', breed: 'Agapornis', age: '1 ano', weight: '50g', emoji: '🦜', color: 'bg-sky-100', tutor: 'Ana Costa', tutorPhone: '(11) 99999-0004', lastVisit: '25/03/2026', status: 'ativo' },
  { id: 5, name: 'Rexy', type: 'Cachorro', breed: 'Pastor Alemão', age: '4 anos', weight: '35kg', emoji: '🦕', color: 'bg-green-100', tutor: 'Carlos Lima', tutorPhone: '(11) 99999-0005', lastVisit: '05/03/2026', status: 'ativo' },
  { id: 6, name: 'Nemo', type: 'Peixe', breed: 'Peixe payaso', age: '1 ano', weight: '100g', emoji: '🐠', color: 'bg-blue-100', tutor: 'Julia Oliveira', tutorPhone: '(11) 99999-0006', status: 'ativo' },
  { id: 7, name: 'Florzinha', type: 'Gato', breed: 'Persa', age: '5 anos', weight: '4.5kg', emoji: '🐱', color: 'bg-pink-100', tutor: 'Carlos Lima', tutorPhone: '(11) 99999-0005', lastVisit: '18/03/2026', status: 'ativo' },
  { id: 8, name: 'Poopy', type: 'Coelho', breed: 'Holland Lop', age: '1 ano', weight: '1.5kg', emoji: '🐰', color: 'bg-rose-100', tutor: 'Julia Oliveira', tutorPhone: '(11) 99999-0006', nextVisit: '10/04/2026', status: 'ativo' },
  { id: 9, name: 'Thor', type: 'Cachorro', breed: 'Bulldog Francês', age: '2 anos', weight: '12kg', emoji: '🐕', color: 'bg-amber-100', tutor: 'Roberto Alves', tutorPhone: '(11) 99999-0007', lastVisit: '22/03/2026', status: 'ativo' },
  { id: 10, name: 'Mia', type: 'Gato', breed: 'British Shorthair', age: '3 anos', weight: '4kg', emoji: '🐱', color: 'bg-violet-100', tutor: 'Patricia Souza', tutorPhone: '(11) 99999-0008', status: 'ativo' },
  { id: 11, name: 'Bilu', type: 'Cachorro', breed: 'SRD', age: '5 anos', weight: '15kg', emoji: '🐕', color: 'bg-amber-100', tutor: 'Marcos Paulo', tutorPhone: '(11) 99999-0009', lastVisit: '28/02/2026', status: 'inativo' },
  { id: 12, name: 'Sonia', type: 'Gato', breed: ' Maine Coon', age: '4 anos', weight: '6kg', emoji: '🐱', color: 'bg-violet-100', tutor: 'Fernanda Lima', tutorPhone: '(11) 99999-0010', status: 'ativo' },
  { id: 13, name: 'Jorge', type: 'Pássaro', breed: 'Calopsita', age: '2 anos', weight: '80g', emoji: '🦜', color: 'bg-sky-100', tutor: 'Ricardo Castro', tutorPhone: '(11) 99999-0011', status: 'ativo' },
  { id: 14, name: 'Bidu', type: 'Cachorro', breed: 'Poodle', age: '6 anos', weight: '8kg', emoji: '🐕', color: 'bg-amber-100', tutor: 'Beatriz Rodrigues', tutorPhone: '(11) 99999-0012', lastVisit: '01/03/2026', status: 'ativo' },
  { id: 15, name: 'Kika', type: 'Coelho', breed: 'Mini Lop', age: '1 ano', weight: '1.2kg', emoji: '🐰', color: 'bg-rose-100', tutor: 'Larissa Oliveira', tutorPhone: '(11) 99999-0013', status: 'ativo' },
  { id: 16, name: 'Paçoca', type: 'Cachorro', breed: 'Labrador', age: '7 anos', weight: '30kg', emoji: '🐕', color: 'bg-amber-100', tutor: 'Gustavo Henrique', tutorPhone: '(11) 99999-0014', lastVisit: '15/02/2026', status: 'inativo' },
  { id: 17, name: 'Mel', type: 'Gato', breed: 'Ragdoll', age: '2 anos', weight: '4.2kg', emoji: '🐱', color: 'bg-violet-100', tutor: 'Carla Mendes', tutorPhone: '(11) 99999-0015', status: 'ativo' },
  { id: 18, name: 'Gold', type: 'Peixe', breed: 'Betta', age: '1 ano', weight: '5g', emoji: '🐠', color: 'bg-blue-100', tutor: 'Bruno Ferreira', tutorPhone: '(11) 99999-0016', status: 'ativo' },
  { id: 19, name: 'Spike', type: 'Cachorro', breed: 'Pitbull', age: '3 anos', weight: '25kg', emoji: '🐕', color: 'bg-amber-100', tutor: 'Diego Santos', tutorPhone: '(11) 99999-0017', lastVisit: '12/03/2026', status: 'ativo' },
  { id: 20, name: 'Lilo', type: 'Gato', breed: 'Sphynx', age: '4 anos', weight: '3.5kg', emoji: '🐱', color: 'bg-violet-100', tutor: 'Amanda Pereira', tutorPhone: '(11) 99999-0018', status: 'ativo' },
]

export const petTypes: PetType[] = ['Cachorro', 'Gato', 'Pássaro', 'Peixe', 'Coelho', 'Jabuti', 'Outro']

export const statusOptions: PetStatus[] = ['ativo', 'inativo']
