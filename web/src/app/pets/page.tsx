"use client"

import { useState, useMemo } from 'react'
import { Plus, PawPrint } from 'lucide-react'
import { Sidebar } from '../dashboard/components/sidebar'
import { Header } from '../dashboard/components/header'
import { Filters } from './components/filters'
import { PetsGrid } from './components/pets-grid'
import { greeting } from '../dashboard/utils/greeting'
import { pets as initialPets } from './data'
import type { FilterOptions } from './types'
import { cn } from '@/lib/utils'

export default function PetsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    type: 'all',
    status: 'all',
    sortBy: 'name',
  })

  const filteredPets = useMemo(() => {
    let result = [...initialPets]

    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(
        (pet) =>
          pet.name.toLowerCase().includes(search) ||
          pet.tutor.toLowerCase().includes(search)
      )
    }

    if (filters.type !== 'all') {
      result = result.filter((pet) => pet.type === filters.type)
    }

    if (filters.status !== 'all') {
      result = result.filter((pet) => pet.status === filters.status)
    }

    switch (filters.sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'recent':
        result.sort((a, b) => (b.lastVisit || '').localeCompare(a.lastVisit || ''))
        break
      case 'type':
        result.sort((a, b) => a.type.localeCompare(b.type))
        break
    }

    return result
  }, [filters])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          onToggle={setSidebarOpen}
          currentPath="/pets"
        />

        <main className={cn('flex-1 transition-all duration-300', sidebarOpen ? 'ml-64' : 'ml-20')}>
          <Header
            greeting={`${greeting()}, Admin! 👋`}
            date="Terça-feira, 01 de Abril de 2026"
          />

          <div className="p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <PawPrint className="w-7 h-7 text-teal-600" />
                  Pets
                </h1>
                <p className="text-slate-600 mt-1">
                  Gerencie os pets cadastrados na clínica
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl transition-colors">
                <Plus className="w-4 h-4" />
                Novo Pet
              </button>
            </div>

            {/* Filters */}
            <Filters
              options={filters}
              onChange={setFilters}
              totalResults={filteredPets.length}
            />

            {/* Pets Grid */}
            <PetsGrid pets={filteredPets} />
          </div>
        </main>
      </div>
    </div>
  )
}
