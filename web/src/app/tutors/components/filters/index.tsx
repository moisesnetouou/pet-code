"use client"

import { Search, ChevronDown } from 'lucide-react'
import { filtersStyles } from './styles'
import type { FiltersProps } from './types'
import { statusOptions } from '../../data'

export function Filters({ options, onChange, totalResults = 0 }: FiltersProps) {
  const f = filtersStyles()

  return (
    <div className={f.container()}>
      <div className={f.searchContainer()}>
        <Search className={f.searchIcon()} />
        <input
          type="text"
          placeholder="Buscar por nome ou telefone..."
          value={options.search}
          onChange={(e) => onChange({ ...options, search: e.target.value })}
          className={f.searchInput()}
        />
      </div>

      <div className={f.selectContainer()}>
        <select
          value={options.status}
          onChange={(e) => onChange({ ...options, status: e.target.value as any })}
          className={f.select()}
        >
          <option value="all">Todos os status</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
        <ChevronDown className={f.selectIcon()} />
      </div>

      <div className={f.selectContainer()}>
        <select
          value={options.sortBy}
          onChange={(e) => onChange({ ...options, sortBy: e.target.value as any })}
          className={f.select()}
        >
          <option value="name">Ordenar A-Z</option>
          <option value="recent">Mais recentes</option>
          <option value="pets">Por quantidade de pets</option>
        </select>
        <ChevronDown className={f.selectIcon()} />
      </div>

      <p className={f.resultsInfo()}>
        {totalResults} {totalResults === 1 ? 'tutor encontrado' : 'tutores encontrados'}
      </p>
    </div>
  )
}
