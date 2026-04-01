"use client"

import { Search, ChevronDown } from 'lucide-react'
import { filtersStyles } from './styles'
import type { FiltersProps } from './types'
import { recordTypes } from '../../data'

export function Filters({ options, onChange, totalResults = 0 }: FiltersProps) {
  const f = filtersStyles()

  return (
    <div className={f.container()}>
      <div className={f.searchContainer()}>
        <Search className={f.searchIcon()} />
        <input
          type="text"
          placeholder="Buscar por pet ou tutor..."
          value={options.search}
          onChange={(e) => onChange({ ...options, search: e.target.value })}
          className={f.searchInput()}
        />
      </div>

      <div className={f.selectContainer()}>
        <select
          value={options.type}
          onChange={(e) => onChange({ ...options, type: e.target.value as any })}
          className={f.select()}
        >
          <option value="all">Todos os tipos</option>
          {recordTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <ChevronDown className={f.selectIcon()} />
      </div>

      <div className={f.selectContainer()}>
        <select
          value={options.status}
          onChange={(e) => onChange({ ...options, status: e.target.value as any })}
          className={f.select()}
        >
          <option value="all">Todos os status</option>
          <option value="concluído">Concluído</option>
          <option value="pendente">Pendente</option>
        </select>
        <ChevronDown className={f.selectIcon()} />
      </div>

      <div className={f.selectContainer()}>
        <select
          value={options.sortBy}
          onChange={(e) => onChange({ ...options, sortBy: e.target.value as any })}
          className={f.select()}
        >
          <option value="date">Mais recentes</option>
          <option value="pet">Por pet</option>
          <option value="type">Por tipo</option>
        </select>
        <ChevronDown className={f.selectIcon()} />
      </div>

      <p className={f.resultsInfo()}>
        {totalResults} {totalResults === 1 ? 'prontuário encontrado' : 'prontuários encontrados'}
      </p>
    </div>
  )
}
