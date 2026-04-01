import { Package, AlertTriangle, TrendingDown, CheckCircle } from 'lucide-react'

export type StockItem = {
  id: number
  name: string
  description: string
  imageUrl: string
  quantity: number
  unit: string
  minQuantity: number
  type: StockType
  clinicId: number
  lastUpdated: string
}

export type StockType = 'MEDICAMENTO' | 'RACAO' | 'BRINQUEDO' | 'VACINA' | 'MATERIAL' | 'OUTRO'

export type FilterOptions = {
  search: string
  type: StockType | 'all'
  showLowStock: boolean
  sortBy: 'name' | 'quantity' | 'updated'
}

export const stockTypeLabels: Record<StockType, string> = {
  MEDICAMENTO: 'Medicamento',
  RACAO: 'Ração',
  BRINQUEDO: 'Brinquedo',
  VACINA: 'Vacina',
  MATERIAL: 'Material',
  OUTRO: 'Outro',
}

export const stockTypeColors: Record<StockType, string> = {
  MEDICAMENTO: 'bg-violet-100 text-violet-800',
  RACAO: 'bg-amber-100 text-amber-800',
  BRINQUEDO: 'bg-pink-100 text-pink-800',
  VACINA: 'bg-emerald-100 text-emerald-800',
  MATERIAL: 'bg-blue-100 text-blue-800',
  OUTRO: 'bg-slate-100 text-slate-800',
}

export const getStockStatus = (item: StockItem) => {
  if (item.quantity === 0) {
    return { label: 'Esgotado', color: 'red', icon: AlertTriangle }
  }
  if (item.quantity <= item.minQuantity) {
    return { label: 'Estoque baixo', color: 'amber', icon: TrendingDown }
  }
  return { label: 'Normal', color: 'emerald', icon: CheckCircle }
}