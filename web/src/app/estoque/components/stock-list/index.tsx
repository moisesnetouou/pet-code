import { stockListStyles } from './styles'
import { StockCard } from '../stock-card'
import type { StockItem } from '../../types'

interface StockListProps {
  items: StockItem[]
  onItemClick?: (item: StockItem) => void
}

export function StockGrid({ items, onItemClick }: StockListProps) {
  const s = stockListStyles()

  if (items.length === 0) {
    return <div className={s.empty()}>Nenhum item encontrado</div>
  }

  return (
    <div className={s.container()}>
      {items.map(item => (
        <StockCard key={item.id} item={item} onClick={onItemClick} />
      ))}
    </div>
  )
}