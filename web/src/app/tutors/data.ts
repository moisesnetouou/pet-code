import type { Tutor, TutorStatus } from './types'

export const tutors: Tutor[] = [
  { id: 1, name: 'João Silva', phone: '(11) 99999-0001', email: 'joao.silva@email.com', address: 'Rua das Flores, 123', city: 'São Paulo', pets: ['Cheems'], status: 'ativo', createdAt: '15/01/2024' },
  { id: 2, name: 'Maria Santos', phone: '(11) 99999-0002', email: 'maria.santos@email.com', address: 'Av. Brasil, 456', city: 'São Paulo', pets: ['Luna'], status: 'ativo', createdAt: '20/02/2024' },
  { id: 3, name: 'Pedro Santos', phone: '(11) 99999-0003', email: 'pedro.santos@email.com', address: 'Rua do Sol, 789', city: 'São Paulo', pets: ['Manuelita'], status: 'ativo', createdAt: '10/03/2024' },
  { id: 4, name: 'Ana Costa', phone: '(11) 99999-0004', email: 'ana.costa@email.com', address: 'Av. Paulista, 101', city: 'São Paulo', pets: ['Pirata'], status: 'ativo', createdAt: '05/04/2024' },
  { id: 5, name: 'Carlos Lima', phone: '(11) 99999-0005', email: 'carlos.lima@email.com', address: 'Rua Augusta, 202', city: 'São Paulo', pets: ['Rexy', 'Florzinha'], status: 'ativo', createdAt: '12/05/2024' },
  { id: 6, name: 'Julia Oliveira', phone: '(11) 99999-0006', email: 'julia.oliveira@email.com', address: 'Av. Pinheiros, 303', city: 'São Paulo', pets: ['Nemo', 'Poopy'], status: 'ativo', createdAt: '18/06/2024' },
  { id: 7, name: 'Roberto Alves', phone: '(11) 99999-0007', email: 'roberto.alves@email.com', address: 'Rua Oscar Freire, 404', city: 'São Paulo', pets: ['Thor'], status: 'ativo', createdAt: '22/07/2024' },
  { id: 8, name: 'Patricia Souza', phone: '(11) 99999-0008', email: 'patricia.souza@email.com', address: 'Av. Faria Lima, 505', city: 'São Paulo', pets: ['Mia'], status: 'ativo', createdAt: '01/08/2024' },
  { id: 9, name: 'Marcos Paulo', phone: '(11) 99999-0009', email: 'marcos.paulo@email.com', address: 'Rua Haddock Lobo, 606', city: 'São Paulo', pets: ['Bilu'], status: 'inativo', createdAt: '15/09/2024' },
  { id: 10, name: 'Fernanda Lima', phone: '(11) 99999-0010', email: 'fernanda.lima@email.com', address: 'Av. Rebouças, 707', city: 'São Paulo', pets: ['Sonia'], status: 'ativo', createdAt: '20/10/2024' },
  { id: 11, name: 'Ricardo Castro', phone: '(11) 99999-0011', email: 'ricardo.castro@email.com', address: 'Rua Estados Unidos, 808', city: 'São Paulo', pets: ['Jorge'], status: 'ativo', createdAt: '05/11/2024' },
  { id: 12, name: 'Beatriz Rodrigues', phone: '(11) 99999-0012', email: 'beatriz.rodrigues@email.com', address: 'Av. Brigadeiro, 909', city: 'São Paulo', pets: ['Bidu'], status: 'ativo', createdAt: '12/12/2024' },
  { id: 13, name: 'Larissa Oliveira', phone: '(11) 99999-0013', email: 'larissa.oliveira@email.com', address: 'Rua Teodoro, 111', city: 'São Paulo', pets: ['Kika'], status: 'ativo', createdAt: '08/01/2025' },
  { id: 14, name: 'Gustavo Henrique', phone: '(11) 99999-0014', email: 'gustavo.henrique@email.com', address: 'Av. Paulista, 222', city: 'São Paulo', pets: ['Paçoca'], status: 'inativo', createdAt: '15/02/2025' },
  { id: 15, name: 'Carla Mendes', phone: '(11) 99999-0015', email: 'carla.mendes@email.com', address: 'Rua Europa, 333', city: 'São Paulo', pets: ['Mel'], status: 'ativo', createdAt: '20/03/2025' },
  { id: 16, name: 'Bruno Ferreira', phone: '(11) 99999-0016', email: 'bruno.ferreira@email.com', address: 'Av. JK, 444', city: 'São Paulo', pets: ['Gold'], status: 'ativo', createdAt: '01/04/2025' },
  { id: 17, name: 'Diego Santos', phone: '(11) 99999-0017', email: 'diego.santos@email.com', address: 'Rua Augusta, 555', city: 'São Paulo', pets: ['Spike'], status: 'ativo', createdAt: '10/05/2025' },
  { id: 18, name: 'Amanda Pereira', phone: '(11) 99999-0018', email: 'amanda.pereira@email.com', address: 'Av. Sumaré, 666', city: 'São Paulo', pets: ['Lilo'], status: 'ativo', createdAt: '15/06/2025' },
]

export const statusOptions: TutorStatus[] = ['ativo', 'inativo']
