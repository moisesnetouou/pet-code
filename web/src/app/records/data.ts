import type { MedicalRecord, MedicalRecordType, MedicalRecordStatus } from './types'

export const records: MedicalRecord[] = [
  { id: 1, petName: 'Cheems', petType: 'Cachorro', petEmoji: '🐕', tutor: 'João Silva', date: '15/03/2026', type: 'Consulta', veterinarian: 'Dr. Carlos', diagnosis: 'Gastrite crônica', notes: 'Recomendar ração específica', status: 'concluído' },
  { id: 2, petName: 'Luna', petType: 'Gato', petEmoji: '🐱', tutor: 'Maria Santos', date: '20/03/2026', type: 'Vacinação', veterinarian: 'Dra. Ana', diagnosis: 'Vacinação em dia', notes: 'Próxima dose em 1 ano', status: 'concluído' },
  { id: 3, petName: 'Manuelita', petType: 'Jabuti', petEmoji: '🐢', tutor: 'Pedro Santos', date: '10/03/2026', type: 'Check-up', veterinarian: 'Dr. Carlos', diagnosis: 'Saúde geral boa', notes: 'Aumentar frequência de check-ups', status: 'concluído' },
  { id: 4, petName: 'Thor', petType: 'Cachorro', petEmoji: '🐕', tutor: 'Roberto Alves', date: '22/03/2026', type: 'Cirurgia', veterinarian: 'Dra. Ana', diagnosis: 'Cirurgia de castração realizada', notes: 'Recuperação em andamento', status: 'concluído' },
  { id: 5, petName: 'Pirata', petType: 'Pássaro', petEmoji: '🦜', tutor: 'Ana Costa', date: '25/03/2026', type: 'Exame', veterinarian: 'Dr. Carlos', diagnosis: 'Exame de sangue normal', notes: 'Aguardar resultados laboratoriais', status: 'pendente' },
  { id: 6, petName: 'Rexy', petType: 'Cachorro', petEmoji: '🦕', tutor: 'Carlos Lima', date: '05/03/2026', type: 'Consulta', veterinarian: 'Dra. Ana', diagnosis: 'Dermatite alérgica', notes: 'Teste de аллергия pendente', status: 'pendente' },
  { id: 7, petName: 'Florzinha', petType: 'Gato', petEmoji: '🐱', tutor: 'Carlos Lima', date: '18/03/2026', type: 'Vacinação', veterinarian: 'Dr. Carlos', diagnosis: 'Vacina tetravalente aplicada', notes: 'Sem reações adversas', status: 'concluído' },
  { id: 8, petName: 'Mia', petType: 'Gato', petEmoji: '🐱', tutor: 'Patricia Souza', date: '28/03/2026', type: 'Check-up', veterinarian: 'Dra. Ana', diagnosis: 'Peso ideal, dentes saudáveis', notes: 'Escovação dental recomendada', status: 'concluído' },
  { id: 9, petName: 'Bidu', petType: 'Cachorro', petEmoji: '🐕', tutor: 'Beatriz Rodrigues', date: '01/03/2026', type: 'Cirurgia', veterinarian: 'Dr. Carlos', diagnosis: 'Cirurgia ocular realizada', notes: 'Retorno em 15 dias', status: 'pendente' },
  { id: 10, petName: 'Sonia', petType: 'Gato', petEmoji: '🐱', tutor: 'Fernanda Lima', date: '12/03/2026', type: 'Consulta', veterinarian: 'Dra. Ana', diagnosis: 'Infecção urinária', notes: 'Antibiótico prescrito por 7 dias', status: 'concluído' },
  { id: 11, petName: 'Jorge', petType: 'Pássaro', petEmoji: '🦜', tutor: 'Ricardo Castro', date: '08/03/2026', type: 'Exame', veterinarian: 'Dr. Carlos', diagnosis: 'Avaliação de penas', notes: 'Possível deficiência vitamínica', status: 'pendente' },
  { id: 12, petName: 'Spike', petType: 'Cachorro', petEmoji: '🐕', tutor: 'Diego Santos', date: '12/03/2026', type: 'Vacinação', veterinarian: 'Dra. Ana', diagnosis: 'Vacina antirrábica aplicada', notes: 'Carteirinha atualizada', status: 'concluído' },
  { id: 13, petName: 'Mel', petType: 'Gato', petEmoji: '🐱', tutor: 'Carla Mendes', date: '30/03/2026', type: 'Check-up', veterinarian: 'Dr. Carlos', diagnosis: 'Exame físico completo', notes: 'Todos os parâmetros normais', status: 'concluído' },
  { id: 14, petName: 'Lilo', petType: 'Gato', petEmoji: '🐱', tutor: 'Amanda Pereira', date: '02/04/2026', type: 'Consulta', veterinarian: 'Dra. Ana', diagnosis: 'Hipertireoidismo', notes: 'Exames complementares pendentes', status: 'pendente' },
  { id: 15, petName: 'Nemo', petType: 'Peixe', petEmoji: '🐠', tutor: 'Julia Oliveira', date: '15/03/2026', type: 'Check-up', veterinarian: 'Dr. Carlos', diagnosis: 'Parâmetros da água OK', notes: 'Troca de água em 7 dias', status: 'concluído' },
]

export const recordTypes: MedicalRecordType[] = ['Consulta', 'Vacinação', 'Cirurgia', 'Exame', 'Check-up']

export const statusOptions: MedicalRecordStatus[] = ['concluído', 'pendente']
