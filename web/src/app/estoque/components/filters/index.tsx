import { Search, Filter } from 'lucide-react'
import { filtersStyles } from './styles'
import type { FilterOptions, StockType } from '../../types'
import { stockTypeLabels } from '../../types'

interface FiltersProps {
  options: FilterOptions
  onChange: (options: FilterOptions) => void
  totalResults: number
}

const typeOptions: (StockType | 'all')[] = ['all', 'MEDICAMENTO', 'RACAO', 'BRINQUEDO', 'VACINA', 'MATERIAL', 'OUTRO']

export function Filters({ options, onChange, totalResults }: FiltersProps) {
  const s = filtersStyles()

  return (
    <div className={s.container()}>
      <div className={s.searchBox()}>
        <Search className={s.searchIcon()} size={18} />
        <input
          type="text"
          placeholder="Buscar item..."
          value={options.search}
          onChange={(e) => onChange({ ...options, search: e.target.value })}
          className={s.searchInput()}
        />
      </div>

      <div className="flex items-center gap-2">
        <select
          value={options.type}
          onChange={(e) => onChange({ ...options, type: e.target.value as StockType | 'all' })}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {typeOptions.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'Todos os tipos' : stockTypeLabels[type]}
            </option>
          ))}
        </select>

        <button
          onClick={() => onChange({ ...options, showLowStock: !options.showLowStock })}
          className={s.toggleButton()}
          style={{
            backgroundColor: options.showLowStock ? 'rgb(20 184 166)' : 'white',
            borderColor: options.showLowStock ? 'rgb(20 184 166)' : 'rgb(226 232 240)',
            color: options.showLowStock ? 'white' : 'rgb(51 65 85)',
          }}
        >
          <Filter size={16} />
          {options.showLowStock ? 'Estoque baixo' : 'Filtrar'}
        </button>

        <select
          value={options.sortBy}
          onChange={(e) => onChange({ ...options, sortBy: e.target.value as FilterOptions['sortBy'] })}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="name">Nome</option>
          <option value="quantity">Quantidade</option>
          <option value="updated">Atualização</option>
        </select>
      </div>

      <span className="text-slate-600 text-sm">
        {totalResults} item{totalResults !== 1 ? 'ns' : ''}
      </span>
    </div>
  )
}