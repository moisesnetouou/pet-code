import type { StockItem, StockType } from './types'

export const stockItems: StockItem[] = [
  // VACINAS
  { id: 1, name: 'Vacina V10', description: 'Vacina polivalente para cães', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24a5c6f2302f?w=400&h=400&fit=crop', quantity: 25, unit: 'doses', minQuantity: 10, type: 'VACINA', clinicId: 1, lastUpdated: '2026-04-01' },
  { id: 2, name: 'Vacina V4', description: 'Vacina polivalente para gatos', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24a5c6f2302f?w=400&h=400&fit=crop', quantity: 8, unit: 'doses', minQuantity: 10, type: 'VACINA', clinicId: 1, lastUpdated: '2026-04-01' },
  
  // MEDICAMENTOS
  { id: 3, name: 'Vermífugo Puppy', description: 'Vermífugo para filhotes', imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop', quantity: 45, unit: 'comprimidos', minQuantity: 20, type: 'MEDICAMENTO', clinicId: 1, lastUpdated: '2026-03-28' },
  { id: 4, name: 'Anti-inflamatório', description: 'Dipirona 500mg', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24a5c6f2302f?w=400&h=400&fit=crop', quantity: 3, unit: 'caixas', minQuantity: 5, type: 'MEDICAMENTO', clinicId: 1, lastUpdated: '2026-03-30' },
  { id: 5, name: 'Antibiótico Amoxicilina', description: 'Antibiótico de amplo espectro', imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop', quantity: 0, unit: 'caixas', minQuantity: 8, type: 'MEDICAMENTO', clinicId: 1, lastUpdated: '2026-03-25' },
  { id: 11, name: 'Anestésico', description: 'Anestésico para procedimentos', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24a5c6f2302f?w=400&h=400&fit=crop', quantity: 6, unit: 'frascos', minQuantity: 5, type: 'MEDICAMENTO', clinicId: 1, lastUpdated: '2026-04-01' },
  { id: 15, name: 'Antiparasitário', description: 'Pipeta antiparasitária para cães', imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop', quantity: 12, unit: 'pipetas', minQuantity: 5, type: 'MEDICAMENTO', clinicId: 1, lastUpdated: '2026-03-29' },

  // MATERIAIS
  { id: 6, name: 'Soro Fisiológico', description: 'Soro fisiológico 0,9% - 500ml', imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=400&fit=crop', quantity: 30, unit: 'frascos', minQuantity: 15, type: 'MATERIAL', clinicId: 1, lastUpdated: '2026-03-29' },
  { id: 7, name: 'Kit Sorologia', description: 'Kits para exames de sorologia', imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=400&fit=crop', quantity: 12, unit: 'kits', minQuantity: 10, type: 'MATERIAL', clinicId: 1, lastUpdated: '2026-04-01' },
  { id: 8, name: 'Luvas Descartáveis', description: 'Luvas de procedimento - M', imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop', quantity: 150, unit: 'pares', minQuantity: 50, type: 'MATERIAL', clinicId: 1, lastUpdated: '2026-03-27' },
  { id: 9, name: 'Seringas 3ml', description: 'Seringas descartáveis 3ml', imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop', quantity: 8, unit: 'caixas', minQuantity: 10, type: 'MATERIAL', clinicId: 1, lastUpdated: '2026-03-31' },
  { id: 16, name: 'Gazes Esterilizadas', description: 'Gazes para curativos', imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop', quantity: 25, unit: 'pacotes', minQuantity: 10, type: 'MATERIAL', clinicId: 1, lastUpdated: '2026-03-28' },

  // RAÇÃO
  { id: 10, name: 'Ração Hipoalergênica', description: 'Ração para cães com sensibilidade', imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop', quantity: 18, unit: 'kg', minQuantity: 10, type: 'RACAO', clinicId: 1, lastUpdated: '2026-03-26' },
  { id: 13, name: 'Ração Felina Premium', description: 'Ração para gatos adultos', imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop', quantity: 12, unit: 'kg', minQuantity: 8, type: 'RACAO', clinicId: 1, lastUpdated: '2026-03-27' },
  { id: 17, name: 'Ração Senior', description: 'Ração para cães idosos', imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop', quantity: 8, unit: 'kg', minQuantity: 5, type: 'RACAO', clinicId: 1, lastUpdated: '2026-03-25' },

  // BRINQUEDOS
  { id: 12, name: 'Bola de Borracha', description: 'Bola resistente para cães', imageUrl: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400&h=400&fit=crop', quantity: 20, unit: 'unidades', minQuantity: 5, type: 'BRINQUEDO', clinicId: 1, lastUpdated: '2026-03-28' },
  { id: 14, name: 'Corda de Nylon', description: 'Corda para brincadeira e higiene dental', imageUrl: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400&h=400&fit=crop', quantity: 15, unit: 'unidades', minQuantity: 5, type: 'BRINQUEDO', clinicId: 1, lastUpdated: '2026-03-25' },
  { id: 18, name: 'Pelúcia para Gatos', description: 'Mouse de pelúcia para gatos', imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop', quantity: 10, unit: 'unidades', minQuantity: 3, type: 'BRINQUEDO', clinicId: 1, lastUpdated: '2026-03-26' },

  // OUTROS
  { id: 19, name: 'Coleira Tamanho M', description: 'Coleira regulável para cães', imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop', quantity: 15, unit: 'unidades', minQuantity: 5, type: 'OUTRO', clinicId: 1, lastUpdated: '2026-03-27' },
  { id: 20, name: 'Cama para Pets', description: 'Cama macia para cães e gatos', imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop', quantity: 6, unit: 'unidades', minQuantity: 2, type: 'OUTRO', clinicId: 1, lastUpdated: '2026-03-24' },
]

export const stats = {
  total: stockItems.length,
  lowStock: stockItems.filter(i => i.quantity <= i.minQuantity).length,
  outOfStock: stockItems.filter(i => i.quantity === 0).length,
  normal: stockItems.filter(i => i.quantity > i.minQuantity).length,
}